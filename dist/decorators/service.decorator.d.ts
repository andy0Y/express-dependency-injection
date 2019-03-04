import { Class } from "../types/class.type";
export declare const Service: () => <T extends Class<{}>>(cstr: T) => {
    new (..._args: any[]): {};
} & T;
