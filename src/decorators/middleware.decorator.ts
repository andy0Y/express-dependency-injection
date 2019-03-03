import { Class } from "../types/class.type";
import { AbstractMiddleware } from "../middlewares/middleware.abstract";
import { DecoratorMissusedError } from "../errors/decorator.missused.error";
import { Service } from "./service.decorator";

export const ExMiddleware = 
<T extends Class<AbstractMiddleware>>
(): any => {

    return (cstr: T) => {

        if(Reflect.get(Reflect.getPrototypeOf(cstr), 'name') === 'AbstractMiddleware') {

            //decorate it to inject it's dependencies
            return Reflect.decorate([<ClassDecorator>Service()], cstr);
            
        } else {
            
            throw new DecoratorMissusedError('ExMiddleware', 'anything other than extension of AbstractMiddleware');
        }
    }
};