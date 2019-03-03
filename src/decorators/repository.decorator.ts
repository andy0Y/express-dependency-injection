import { Class } from "../types/class.type";
import { DecoratorMissusedError } from "../errors/decorator.missused.error";
import { RepositoryInterface } from "../repository/repository.interface";
import { ModelInterface } from "../model/model.interface";
import { Service } from "./service.decorator";

export const ExRepository = 
<U extends ModelInterface, T extends Class<RepositoryInterface<U>>>
(): any => {

    return (cstr: T) => {

        if(Reflect.get(Reflect.getPrototypeOf(cstr), 'name') === 'Repository') {
    
            // then decorate it to inject it's dependencies
            return Reflect.decorate([<ClassDecorator>Service()], cstr);
            
        } else {
            
            throw new DecoratorMissusedError('ExRepository', 'anything other than extends of AbstractRepository');
        }
    };
}

