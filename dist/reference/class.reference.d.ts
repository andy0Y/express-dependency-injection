import { Reference } from "./reference.interface";
import { Class } from "../types/class.type";
export declare class ClassReference<T> implements Reference<T> {
    _inner: T | null;
    private _ref;
    constructor(ref: Class<T>);
    readonly ressource: T;
}
