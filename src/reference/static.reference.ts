import { Reference } from "./reference.interface";
import { Primitive } from "../types/primitive.type";

export class StaticReference implements Reference<Primitive> {
    
    public _inner: Primitive;
    
    constructor(val: Primitive) {

        this._inner = val;
    }
    
    get ressource(): Primitive {

        return this._inner;
    }
}