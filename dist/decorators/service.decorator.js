"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = () => {
    return (cstr) => {
        const argz = [];
        for (let pos = 0; pos < cstr.length; pos++) {
            const arg = Reflect.getOwnMetadata(Symbol.for(`${cstr.name}_${pos}`), cstr);
            if (!!arg) {
                argz.push(arg);
            }
        }
        return class extends cstr {
            constructor(..._args) {
                super(...argz);
            }
        };
    };
};
//# sourceMappingURL=service.decorator.js.map