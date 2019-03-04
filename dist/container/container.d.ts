import { Class } from "../types/class.type";
import { Primitive } from "../types/primitive.type";
export declare class Container {
    private static _ressources;
    private static _ressourcesProtected;
    static get<T>(key: symbol | Class<T>): T | Primitive;
    static register<T>(key: Class<T>): Container;
    static registerStatic(key: string, val: Primitive): Container;
    static registerProtectedStatic(key: string, val: Primitive): Container;
}
