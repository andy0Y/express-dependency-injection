import { Class } from "../types/class.type";
export declare class RessourceNotFoundError<T> extends Error {
    constructor(key: Symbol | Class<T>);
}
