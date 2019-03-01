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
    
    return (target: U, propertyKey: string, descriptor: PropertyDescriptor) => {

        // bind the function call to the class before it is retrieved in the router
        // decorator so that we don't loose context
        descriptor.value = descriptor.value.bind(target);
        // register a function wrapping the call to class metadata,
        // in reverse order to keep logic simple
        const className = Reflect.get(Object.getOwnPropertyDescriptor(target, 'constructor').value, 'name');

        Container.registerProtectedStatic(
                `${className}_${propertyKey}`,
                !!args.middlewares ? args.middlewares : []);
        Container.registerProtectedStatic(`${className}_${propertyKey}_path`, args.path);
        Container.registerProtectedStatic(`${className}_${propertyKey}_verb`, args.verb);
    }
}