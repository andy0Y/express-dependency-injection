import { Class } from "../types/class.type";

export class RessourceNotFoundError<T> extends Error {

    constructor(key : Symbol | Class<T>) {

        super(`ressource not found : ${typeof key === 'symbol' ? Symbol.keyFor(key) : (<Class<T>>key).prototype.name}`);
    }
}