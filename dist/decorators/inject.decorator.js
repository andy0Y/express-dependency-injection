"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../container/container");
require("reflect-metadata");
exports.Inject = (paramTarget) => {
    typeof paramTarget === 'string' ? container_1.Container.registerStatic(paramTarget, undefined) : container_1.Container.register(paramTarget);
    const parsedTarget = typeof paramTarget === 'string' ? Symbol.for(paramTarget) : paramTarget;
    return (target, propertyKey, indexOrDescriptor) => {
        if (typeof target === 'object') {
            if (!indexOrDescriptor) {
                return injectProperty(target, propertyKey, parsedTarget);
            }
            else if (!indexOrDescriptor.get) {
                return injectMethod(target, propertyKey, indexOrDescriptor, parsedTarget);
            }
            else {
                return injectAccessor(target, propertyKey, indexOrDescriptor, parsedTarget);
            }
        }
        else {
            return injectParameter(target, propertyKey, indexOrDescriptor, parsedTarget);
        }
    };
};
const injectParameter = (target, propertyKey, index, paramTarget) => {
    //add injected data as Metadata to the constructor 
    Reflect.defineMetadata(Symbol.for(`${target.name}_${index}`), container_1.Container.get(paramTarget), target);
};
const injectProperty = (target, propertyKey, paramTarget) => {
    //delete the property
    Reflect.deleteProperty(target, propertyKey);
    //build the new property around a getter function :
    Reflect.defineProperty(target, propertyKey, {
        get: () => container_1.Container.get(paramTarget),
        set: undefined,
        enumerable: false,
        configurable: true
    });
};
const injectMethod = (_target, _propertyKey, descriptor, paramTarget) => {
    descriptor.value = () => container_1.Container.get(paramTarget);
};
const injectAccessor = (_target, _propertyKey, descriptor, paramTarget) => {
    descriptor.get = () => container_1.Container.get(paramTarget);
};
//# sourceMappingURL=inject.decorator.js.map