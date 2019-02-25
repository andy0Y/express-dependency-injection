import { Primitive } from "../types/primitive.type";
import { Class } from "../types/class.type";
import { Container } from "./container";

export const register = (args: {statics: Array<{key: string, value: Primitive}>}): void => {

    args.statics.forEach(ztatic => Container.registerStatic(ztatic.key, ztatic.value));
} 