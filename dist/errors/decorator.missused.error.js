"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DecoratorMissusedError extends Error {
    constructor(decoratorName, target) {
        super(`${decoratorName} cannot be used for ${target}`);
    }
}
exports.DecoratorMissusedError = DecoratorMissusedError;
//# sourceMappingURL=decorator.missused.error.js.map