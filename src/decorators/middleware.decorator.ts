import { Class } from "../types/class.type";
import { AbstractMiddleware } from "../middlewares/middleware.abstract";
import { DecoratorMissusedError } from "../errors/decorator.missused.error";
import { Container } from "../container/container";
import { Service } from "./service.decorator";

export const ExMiddleware = 
<T extends Class<AbstractMiddleware>>
(): any => {

    return (cstr: T) => {

        if(Reflect.get(Reflect.getPrototypeOf(cstr), 'name') === 'AbstractMiddleware') {

            // first registering middleware as Service (since it might not be injected at all)
            Container.register(cstr);
            // then decorate it to inject it's dependencies
            return Reflect.decorate([<ClassDecorator>Service()], cstr);
            
        } else {
            
            throw new DecoratorMissusedError('ExMiddleware', 'anything other than extension of AbstractMiddleware');
        }
    }
};