import { Constructor } from "../types/function.type";
import { ModelInterface } from "../model/model.interface";
export declare const Repository: <T extends Constructor<{}>, U extends ModelInterface>(target: T) => {
    new (...args: any[]): {
        getModel(model: U): any;
    };
} & T;
