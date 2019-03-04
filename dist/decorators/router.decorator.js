"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../container/container");
const service_decorator_1 = require("./service.decorator");
const express = require("express");
const decorator_missused_error_1 = require("../errors/decorator.missused.error");
const route_builder_1 = require("../builder/routes/route.builder");
exports.ExRouter = (args) => {
    //register all middleware and router if not already in container
    if (!!args.middlewares) {
        args.middlewares.forEach(middleware => container_1.Container.register(middleware));
    }
    if (!!args.routers) {
        args.routers
            .forEach(router => container_1.Container.register(router));
    }
    return (cstr) => {
        if (Reflect.get(Reflect.getPrototypeOf(cstr), 'name') === 'AbstractRouter') {
            const router = express.Router();
            //creating the actual router and registering it into the class metadata 
            if (!!args.middlewares) {
                args.middlewares.reverse().forEach(middlewareRef => {
                    router.use(container_1.Container.get(middlewareRef).handle());
                });
            }
            if (!!args.routers) {
                args.routers.forEach(routerRef => {
                    const subRouterInfo = container_1.Container.get(routerRef).getExpressRouter();
                    router.use(subRouterInfo.path, subRouterInfo.router);
                });
            }
            //adding the actual routes to router
            const className = Reflect.get(cstr, 'name');
            const classFunctions = Object.getOwnPropertyDescriptors(cstr.prototype);
            Object.entries(classFunctions)
                .map(([key, value]) => { return { key: key, value: value }; })
                .filter(entrie => entrie.key !== 'constructor' && typeof entrie.value.value === 'function')
                .forEach(entrie => {
                const path = container_1.Container.get(Symbol.for(`${className}_${entrie.key}_path`)), verb = container_1.Container.get(Symbol.for(`${className}_${entrie.key}_verb`)), middlewares = container_1.Container.get(Symbol.for(`${className}_${entrie.key}`))
                    .map(middlewareSymbolKey => container_1.Container.get(middlewareSymbolKey));
                // deffering the route binding to the helper
                route_builder_1.RouteBuilder.build(router, path, verb, middlewares, entrie.value.value);
            });
            return Reflect.decorate([service_decorator_1.Service()], class extends cstr {
                getExpressRouter() {
                    return { path: args.path, router: router };
                }
            });
        }
        else {
            throw new decorator_missused_error_1.DecoratorMissusedError('ExRouter', 'anything other than extension of AbstractRouter');
        }
    };
};
//# sourceMappingURL=router.decorator.js.map