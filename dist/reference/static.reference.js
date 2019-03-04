"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StaticReference {
    constructor(val) {
        this._inner = val;
    }
    get ressource() {
        return this._inner;
    }
}
exports.StaticReference = StaticReference;
//# sourceMappingURL=static.reference.js.map