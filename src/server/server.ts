import express = require("express");
import { Express } from 'express';
import { RootConfigurator } from "../configurator/routes/route.configurator";
import { ExpressMiddleware } from "../types/function.type";
import { Router } from "../router/router";

export abstract class Server {

    public static build(): Express {

        const app: Express = express(),
        {middlewareSchemas, routerSchemas} = RootConfigurator.getConfig();
        let middlewares: Array<ExpressMiddleware> = [];
        if(!!middlewareSchemas) {

            middlewares = middlewareSchemas.map((middlewareSchema) => {

                const middleware = new middlewareSchema.middleware();
                return middleware.handle();
            });
            app.all('/', middlewares);
        }
        routerSchemas.forEach((routerSchema) => {
            
            const router = new Router(routerSchema);
            app.use(routerSchema.path, router.build());
        });
        return app;
    }
}