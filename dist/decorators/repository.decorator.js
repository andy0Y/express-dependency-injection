"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_missused_error_1 = require("../errors/decorator.missused.error");
const service_decorator_1 = require("./service.decorator");
exports.ExRepository = () => {
    return (cstr) => {
        if (Reflect.get(Reflect.getPrototypeOf(cstr), 'name') === 'Repository') {
            // then decorate it to inject it's dependencies
            return Reflect.decorate([service_decorator_1.Service()], cstr);
        }
        else {
            throw new decorator_missused_error_1.DecoratorMissusedError('ExRepository', 'anything other than extends of AbstractRepository');
        }
    };
};
//# sourceMappingURL=repository.decorator.js.map