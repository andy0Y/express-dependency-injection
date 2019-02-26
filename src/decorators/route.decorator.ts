import { HttpVerbs } from "../enums/http.verbs.enum";
import { AbstractMiddleware } from "../middlewares/middleware.abstract";
import { Class } from "../types/class.type";
import { AbstractRouter } from "../router/router.abstract";
import { Container } from "../container/container";

export const ExRoute = 
<T extends Class<AbstractMiddleware>, U extends AbstractRouter>
(args: {
    path: string,
    verb: HttpVerbs,
    middlewares?: Array<T>
}) => {

    // register all middlewares if not already in container
    if(!! args.middlewares) {

        args.middlewares.forEach(middleware => Container.register(middleware));
    }
    
    return (target: U, propertyKey: string, _descriptor: PropertyDescriptor) => {

        //register a function wrapping the call to class metadata,
        // in reverse order to keep logic simple
        const className = Reflect.get(Object.getOwnPropertyDescriptor(target, 'constructor').value, 'name');
        if(!! args.middlewares) {
            
            const middleList: Array<AbstractMiddleware> = [];
            args.middlewares.reverse().forEach(middlewareRef => {

                middleList.push(<AbstractMiddleware>Container.get(middlewareRef));
            });
            Container.registerStatic(`${className}_${propertyKey}`, middleList);
        }
        //registering path and verb to Container :
        Container.registerStatic(`${className}_${propertyKey}_path`, args.path);
        Container.registerStatic(`${className}_${propertyKey}_verb`, args.verb);
        // Reflect.defineMetadata(Symbol.for(`${propertyKey}_path`), args.path, target);
        // Reflect.defineMetadata(Symbol.for(`${propertyKey}_verb`), args.verb, target);
    }
}