import { Class } from "../types/class.type";
import { ServiceInterface } from "../service/service.inteface";
import { Container } from "../container/container";
import 'reflect-metadata'


export const Inject = (paramTarget: string | Class<ServiceInterface>) => {

    typeof paramTarget === 'string' ? Container.registerStatic(paramTarget, undefined) : Container.register(paramTarget);
    const parsedTarget = typeof paramTarget === 'string' ? Symbol.for(paramTarget) : paramTarget;
    return (target: any, propertyKey: string | symbol, indexOrDescriptor?: number | PropertyDescriptor) => {

        if(typeof target === 'object') {

            if(!indexOrDescriptor) {
    
                return injectProperty(target, <string>propertyKey, parsedTarget);
            } else if(!(<PropertyDescriptor>indexOrDescriptor).get) {

                return injectMethod(target, <string>propertyKey, <PropertyDescriptor>indexOrDescriptor, parsedTarget);
            } else {

                return injectAccessor(target, <string>propertyKey, <PropertyDescriptor>indexOrDescriptor, parsedTarget);
            }
        } else {

            return injectParameter(target, propertyKey, <number>indexOrDescriptor, parsedTarget);
        }
    }
}

const injectParameter = (target: Function, propertyKey: string | symbol, index: number, paramTarget: symbol | Class<ServiceInterface>) => {

    //add injected data as Metadata to the constructor 
    Reflect.defineMetadata(Symbol.for(`${target.name}_${index}`), Container.get(paramTarget), target);
}

const injectProperty = (target:object, propertyKey: string, paramTarget: symbol | Class<ServiceInterface>) => {

    //delete the property
    Reflect.deleteProperty(target, propertyKey);
    //build the new property around a getter function :
    Reflect.defineProperty(target, propertyKey, {

        get: () => Container.get(paramTarget),
        set: undefined,
        enumerable: false,
        configurable: true
    });
}

const injectMethod = (_target: Function, _propertyKey: string, descriptor: PropertyDescriptor, paramTarget: symbol | Class<ServiceInterface>) => {

    descriptor.value = () => Container.get(paramTarget);
}

const injectAccessor = (_target: object, _propertyKey: string, descriptor: PropertyDescriptor, paramTarget: symbol | Class<ServiceInterface>) => {

    descriptor.get = () => Container.get(paramTarget);
}