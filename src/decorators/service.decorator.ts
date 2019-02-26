import { Class } from "../types/class.type";

export const Service = () => {

    return <T extends Class<{}>>(cstr: T) => {
        
        const argz = [];
        for (let pos = 0; pos < cstr.length; pos++) {
            
            const arg = Reflect.getOwnMetadata(Symbol.for(`${cstr.name}_${pos}`), cstr);
            if(!!arg) {

                argz.push(arg);
            }
        }
        return class extends cstr {

            constructor(..._args: any[]) {

                super(...argz);
            }
        }
    } 
}