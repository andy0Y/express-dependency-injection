"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const static_reference_1 = require("../reference/static.reference");
const class_reference_1 = require("../reference/class.reference");
const ressource_not_found_error_1 = require("../errors/ressource-not-found.error");
class Container {
    static get(key) {
        const symbolKey = typeof key === 'symbol' ?
            key :
            Symbol.for(Reflect.get(Reflect.getPrototypeOf(key), 'name'));
        const ref = Container._ressources
            .find(current => current.selector === symbolKey);
        if (ref) {
            return ref.ressource.ressource;
        }
        else {
            const protectedRef = Container._ressourcesProtected
                .find(current => current.selector === symbolKey);
            if (protectedRef) {
                return protectedRef.ressource.ressource;
            }
            else {
                throw new ressource_not_found_error_1.RessourceNotFoundError(symbolKey);
            }
        }
    }
    static register(key) {
        //checking if not duplicated
        const selector = Symbol.for(Reflect.get(Reflect.getPrototypeOf(key), 'name')), isDuplicated = Container._ressources.find(schema => schema.selector === selector);
        if (!isDuplicated) {
            //creating reference
            const ref = new class_reference_1.ClassReference(key);
            //registrering
            Container._ressources.push({ selector: selector, ressource: ref });
        }
        return Container;
    }
    static registerStatic(key, val) {
        //checking if not duplicated, and if so if duplicated is not pending (dummy)
        const selector = Symbol.for(key), isDuplicated = Container._ressources.find(schema => schema.selector === selector);
        if (!isDuplicated) {
            //creating reference
            const ref = new static_reference_1.StaticReference(val);
            Container._ressources.push({ selector: selector, ressource: ref });
        }
        return Container;
    }
    static registerProtectedStatic(key, val) {
        //checking if not duplicated, and if so if duplicated is not pending (dummy)
        const selector = Symbol.for(key), isDuplicated = Container._ressourcesProtected.find(schema => schema.selector === selector);
        if (!isDuplicated) {
            //creating reference
            const ref = new static_reference_1.StaticReference(val);
            Container._ressourcesProtected.push({ selector: selector, ressource: ref });
        }
        return Container;
    }
}
Container._ressources = [];
Container._ressourcesProtected = [];
exports.Container = Container;
//# sourceMappingURL=container.js.map