import { Reference } from "./reference.interface";
import { Primitive } from "../types/primitive.type";
export declare class StaticReference implements Reference<Primitive> {
    _inner: Primitive;
    constructor(val: Primitive);
    readonly ressource: Primitive;
}
