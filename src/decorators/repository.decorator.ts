import { Class } from "../types/class.type";
import { Container } from "../container/container";
import { DecoratorMissusedError } from "../errors/decorator.missused.error";
import { RepositoryInterface } from "../repository/repository.interface";
import { ModelInterface } from "../model/model.interface";
import { Service } from "./service.decorator";

export const ExRepository = 
<U extends ModelInterface, T extends Class<RepositoryInterface<U>>>
() => {

    (cstr: T) => {

        if(Reflect.get(Reflect.getPrototypeOf(cstr), 'name') === 'Repository') {
    
            // first registering middleware as Service (since it might not be injected at all)
            Container.register(cstr);
            // then decorate it to inject it's dependencies
            return Reflect.decorate([<ClassDecorator>Service()], cstr);
            
        } else {
            
            throw new DecoratorMissusedError('ExRepository', 'anything other than extends of AbstractRepository');
        }
    };
}

