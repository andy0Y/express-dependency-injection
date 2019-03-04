import { HttpVerbs } from "./http.verbs.enum";
import { RouteInterface } from "../../routes/route.interface";
import { Class } from "../../types/class.type";
import { MiddlewareSchema } from "./middleware.schema";
export declare class RouteSchema {
    readonly verb: HttpVerbs;
    readonly path: string;
    readonly middlewares?: Array<MiddlewareSchema>;
    readonly route: Class<RouteInterface>;
    constructor(args: {
        verb: HttpVerbs;
        path: string;
        middlewares?: Array<MiddlewareSchema>;
        route: Class<RouteInterface>;
    });
}
