import { Router as ExpressRouter } from 'express';
import { RouterSchema } from '../schema/router/router.schema';
import { RouteBuilder } from '../builder/routes/route.builder';
import express = require('express');

export class Router {

    private routerSchema: RouterSchema;

    constructor(config: RouterSchema) {

        this.routerSchema = config;
    }

    build(): ExpressRouter {

        let router: ExpressRouter = express.Router();
        if(!! this.routerSchema.middlewares) {

            this.routerSchema.middlewares.forEach(middlewareSchema => {

                const middleware = new middlewareSchema.middleware();
                router.use(middleware.handle());
            });
        }
        if(!! this.routerSchema.routers) {

            this.routerSchema.routers.forEach((routerSchema) => {

                const subRouter = new Router(routerSchema);
                router.use(routerSchema.path, subRouter.build());
            });
        }
        if(!! this.routerSchema.routes) {

            this.routerSchema.routes.forEach((routeSchema) => {

                router = RouteBuilder.build(router, routeSchema);
            });
        }
        return router;
    }
}