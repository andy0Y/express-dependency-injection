import { Router as ExpressRouter } from 'express';
import { Class } from "../types/class.type";
import { AbstractRouter } from "../router/router.abstract";
import { AbstractMiddleware } from "../middlewares/middleware.abstract";
import { Container } from "../container/container";
import { Service } from "./service.decorator";
import express = require("express");
import { DecoratorMissusedError } from '../errors/decorator.missused.error';
import { RouteBuilder } from '../builder/routes/route.builder';
import { HttpVerbs } from '../enums/http.verbs.enum';

export const ExRouter = 
<T extends Class<AbstractRouter>, U extends Class<AbstractMiddleware>, V extends Class<AbstractRouter>>
(args: {
    path: string,
    middlewares?: Array<U>,
    routers?: Array<T>
}): any => {

    //register all middleware and router if not already in container
    if(!! args.middlewares) {

        args.middlewares.forEach(middleware => Container.register(middleware));
    }
    if(!! args.routers) {

        args.routers
        .forEach(router => Container.register(router));
    }

    return (cstr: V) => {
        
        if(Reflect.get(Reflect.getPrototypeOf(cstr), 'name') === 'AbstractRouter') {

            const router: ExpressRouter = express.Router();
            //creating the actual router and registering it into the class metadata 
            if(!! args.middlewares) {
                
                args.middlewares.reverse().forEach(middlewareRef => {
                    
                    router.use((<AbstractMiddleware>Container.get(middlewareRef)).handle());
                });
            }
            if(!! args.routers) {
                
                args.routers.forEach(routerRef => {

                    const subRouterInfo: {path: string, router: ExpressRouter} =
                    <{path: string, router: ExpressRouter}>(<AbstractRouter>Container.get(routerRef)).getExpressRouter();
                    router.use(subRouterInfo.path, subRouterInfo.router);
                });
            }
            //adding the actual routes to router
            const className = Reflect.get(cstr, 'name');
            const classFunctions = Object.getOwnPropertyDescriptors(cstr.prototype)
            Object.keys(classFunctions)
            .filter(funcName => funcName !== 'constructor')
            .forEach(name => {

                const path: string = <string>Container.get(Symbol.for(`${className}_${name}_path`)),
                verb: HttpVerbs = <HttpVerbs>Container.get(Symbol.for(`${className}_${name}_verb`)),
                middlewares: Array<AbstractMiddleware> = 
                (<Array<symbol>>Container.get(Symbol.for(`${className}_${name}`)))
                .map(middlewareSymbolKey => <AbstractMiddleware>Container.get(middlewareSymbolKey));

                RouteBuilder.build(router, path, verb, middlewares, classFunctions[name].value);
            });

            return Reflect.decorate([<ClassDecorator>Service()], class extends cstr {

                public getExpressRouter(): {path: string, router: ExpressRouter} | void {

                    return {path: args.path, router: router};
                }
            });
        } else {
            
            throw new DecoratorMissusedError('ExRouter', 'anything other than extension of AbstractRouter');
        }
    };
}