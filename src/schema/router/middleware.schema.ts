import { MiddlewareInterface } from "../../middlewares/middleware.interface";
import { Class } from "../../types/class.type";

export class MiddlewareSchema {

    public readonly middleware: Class<MiddlewareInterface>;

    constructor(args: {

        middleware: Class<MiddlewareInterface>
    }) {

        this.middleware = args.middleware;
    }
}