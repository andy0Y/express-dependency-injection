import { MiddlewareSchema } from "./middleware.schema";
import { RouteSchema } from "./route.schema";
export declare class RouterSchema {
    readonly path: string;
    readonly middlewares?: Array<MiddlewareSchema>;
    readonly routes: Array<RouteSchema>;
    readonly routers: Array<RouterSchema>;
    constructor(args: {
        path: string;
        routes?: Array<RouteSchema>;
        routers?: Array<RouterSchema>;
        middlewares?: Array<MiddlewareSchema>;
    });
}
