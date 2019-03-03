import { ReferenceSchema } from "../schema/reference/reference.schema";
import { Class } from "../types/class.type";
import { Primitive } from "../types/primitive.type";
import { StaticReference } from "../reference/static.reference";
import { ClassReference } from "../reference/class.reference";
import { RessourceNotFoundError } from "../errors/ressource-not-found.error";

export class Container {

    private static _ressources: Array<ReferenceSchema> = [];
    private static _ressourcesProtected: Array<ReferenceSchema> = [];

    public static get<T>(key: symbol | Class<T>): T | Primitive {

        const symbolKey =  typeof key === 'symbol' ?
        key :
        Symbol.for(Reflect.get(Reflect.getPrototypeOf(key), 'name'));
        const ref = Container._ressources
        .find(current => current.selector === symbolKey);
        if(ref) {

            return ref.ressource.ressource
        } else {

            const protectedRef = Container._ressourcesProtected
            .find(current => current.selector === symbolKey);
            if(protectedRef) {

                return protectedRef.ressource.ressource
            } else {

                throw new RessourceNotFoundError(symbolKey);
            }
        }
    }

    public static register<T>(key: Class<T>): Container {

        //checking if not duplicated
        const selector = Symbol.for(Reflect.get(Reflect.getPrototypeOf(key), 'name')),
        isDuplicated = Container._ressources.find(schema => schema.selector === selector);
        if(!isDuplicated) {

            //creating reference
            const ref = new ClassReference(key);
            //registrering
            Container._ressources.push({selector: selector, ressource: ref});
        }
            return Container;
    }

    public static registerStatic(key: string, val: Primitive): Container {

        //checking if not duplicated, and if so if duplicated is not pending (dummy)
        const selector = Symbol.for(key),
        isDuplicated = Container._ressources.find(schema => schema.selector === selector);

        if(!isDuplicated) {

            //creating reference
            const ref = new StaticReference(val);
            Container._ressources.push({selector: selector, ressource: ref});
        }
            
        return Container;
    }

    public static registerProtectedStatic(key: string, val: Primitive): Container {

        //checking if not duplicated, and if so if duplicated is not pending (dummy)
        const selector = Symbol.for(key),
        isDuplicated = Container._ressourcesProtected.find(schema => schema.selector === selector);
        if(!isDuplicated) {

            //creating reference
            const ref = new StaticReference(val);
            Container._ressourcesProtected.push({selector: selector, ressource: ref});
        }
            
        return Container;
    }
}