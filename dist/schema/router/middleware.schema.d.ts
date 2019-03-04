import { MiddlewareInterface } from "../../middlewares/middleware.interface";
import { Class } from "../../types/class.type";
export declare class MiddlewareSchema {
    readonly middleware: Class<MiddlewareInterface>;
    constructor(args: {
        middleware: Class<MiddlewareInterface>;
    });
}
