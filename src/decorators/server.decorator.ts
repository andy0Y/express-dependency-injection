import { AbstractRouter } from "../router/router.abstract";
import { Class } from "../types/class.type";
import { AbstractServer } from "../server/server.abstract";
import { Container } from "../container/container";
import { Router as ExpressRouter, Express } from 'express';
import express = require("express");
import { Constructor } from "../types/function.type";

export const ExServer = 
<T extends Class<AbstractRouter>, U extends Constructor<AbstractServer>>
(args: {main: T}): any => {

    //registering the main router
    Container.register(args.main);
    return (cstr: U) => {

        const app = express();

        const subRouterInfo: {path: string, router: ExpressRouter} =
        <{path: string, router: ExpressRouter}>(<AbstractRouter>Container.get(args.main)).getExpressRouter();
        app.use(subRouterInfo.path, subRouterInfo.router);

        return class extends cstr {

            protected app: Express = app;
        }
    }
}