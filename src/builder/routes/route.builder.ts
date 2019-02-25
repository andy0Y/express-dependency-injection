import { RouteSchema } from "../../schema/router/route.schema";
import { Router as ExpressRouter } from 'express';
import { HttpVerbs } from "../../schema/router/http.verbs.enum";
import { ExpressMiddleware } from "../../types/function.type";

export abstract class RouteBuilder {

    public static build(router: ExpressRouter, routeSchema: RouteSchema): ExpressRouter {

        const verb: HttpVerbs = routeSchema.verb,
        path: string = routeSchema.path,
        route = new routeSchema.route();
        let middlewares: Array<ExpressMiddleware> = [];
        if(!!routeSchema.middlewares) {

            middlewares = routeSchema.middlewares.map((middlewareSchema) => {

                const middleware =  new middlewareSchema.middleware();
                return middleware.handle();
            });
        }
        if(verb === HttpVerbs.GET) {

            router.get(path, middlewares, route.handle());
        } else if(verb === HttpVerbs.POST) {

            router.post(path, middlewares, route.handle());
        } else if(verb === HttpVerbs.PUT) {

            router.put(path, middlewares, route.handle());
        } else if(verb === HttpVerbs.DELETE) {

            router.delete(path, middlewares, route.handle());
        } else if(verb === HttpVerbs.OPTIONS) {

            router.options(path, middlewares, route.handle());
        } else if(verb === HttpVerbs.HEAD) {

            router.head(path, middlewares, route.handle());
        } else if(verb === HttpVerbs.PATCH) {

            router.patch(path, middlewares, route.handle());
        } else if(verb === HttpVerbs.TRACE) {

            router.trace(path, middlewares, route.handle());
        } else if(verb === HttpVerbs.CONNECT) {

            router.connect(path, middlewares, route.handle());
        }
        return router;
    }
}