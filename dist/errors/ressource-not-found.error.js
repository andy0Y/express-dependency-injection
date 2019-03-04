"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RessourceNotFoundError extends Error {
    constructor(key) {
        super(`ressource not found : ${typeof key === 'symbol' ? Symbol.keyFor(key) : key.prototype.name}`);
    }
}
exports.RessourceNotFoundError = RessourceNotFoundError;
//# sourceMappingURL=ressource-not-found.error.js.map