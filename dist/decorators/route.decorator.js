"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../container/container");
exports.ExRoute = (args) => {
    // register all middlewares if not already in container
    if (!!args.middlewares) {
        args.middlewares.forEach(middleware => container_1.Container.register(middleware));
    }
    return (target, propertyKey, descriptor) => {
        // bind the function call to the class before it is retrieved in the router
        // decorator so that we don't loose context
        descriptor.value = descriptor.value.bind(target);
        // register a function wrapping the call to class metadata,
        // in reverse order to keep logic simple
        const className = Reflect.get(Object.getOwnPropertyDescriptor(target, 'constructor').value, 'name');
        container_1.Container.registerProtectedStatic(`${className}_${propertyKey}`, !!args.middlewares ? args.middlewares : []);
        container_1.Container.registerProtectedStatic(`${className}_${propertyKey}_path`, args.path);
        container_1.Container.registerProtectedStatic(`${className}_${propertyKey}_verb`, args.verb);
    };
};
//# sourceMappingURL=route.decorator.js.map