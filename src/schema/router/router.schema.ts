import { MiddlewareSchema } from "./middleware.schema";
import { RouteSchema } from "./route.schema";

export class RouterSchema {

    public readonly path: string;
    public readonly middlewares?: Array<MiddlewareSchema>;
    public readonly routes: Array<RouteSchema>;
    public readonly routers: Array<RouterSchema>;

    constructor(args: {

        path: string,
        routes?: Array<RouteSchema>,
        routers?: Array<RouterSchema>
        middlewares?: Array<MiddlewareSchema>
    }) {

        this.path = args.path;
        if(!!args.routes) {

            this.routes = args.routes;
        }
        if(!!args.routers) {

            this.routers = args.routers;
        }
        if(!!args.middlewares) {

            this.middlewares = args.middlewares;
        }
    }
}