"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClassReference {
    constructor(ref) {
        this._inner = null;
        this._ref = ref;
    }
    get ressource() {
        return !this._inner ? (this._inner = Reflect.construct(this._ref, []),
            this._inner) :
            this._inner;
    }
}
exports.ClassReference = ClassReference;
//# sourceMappingURL=class.reference.js.map