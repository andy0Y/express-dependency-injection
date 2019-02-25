import { Reference } from "./reference.interface";
import { Class } from "../types/class.type";

export class ClassReference<T> implements Reference<T> {

    public _inner: T | null = null;
    private _ref: Class<T>;

    constructor(ref: Class<T>) {

        this._ref = ref;
    }
    
    get ressource(): T {
        
        return !this._inner ? (this._inner = Reflect.construct(
            
            this._ref,
            []
        ),
        <T>this._inner
        ) :
        this._inner;
    }
}