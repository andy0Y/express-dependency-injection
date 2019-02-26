import { HttpVerbs } from "./http.verbs.enum";
import { RouteInterface } from "../../routes/route.interface";
import { Class } from "../../types/class.type";
import { MiddlewareSchema } from "./middleware.schema";



export class RouteSchema {

    public readonly verb: HttpVerbs;
    public readonly path: string;
    public readonly middlewares?: Array<MiddlewareSchema>;
    public readonly route: Class<RouteInterface>; 
    
    constructor(args: {

        verb: HttpVerbs,
        path: string,
        middlewares?: Array<MiddlewareSchema>,
        route: Class<RouteInterface>,
    }) {

        this.verb = args.verb;
        this.path = args.path;
        this.route = args.route;
        if(!! args.middlewares) {

            this.middlewares = args.middlewares;
        }
    }
}