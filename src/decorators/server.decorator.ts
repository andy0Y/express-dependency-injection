import { AbstractRouter } from "../router/router.abstract";
import { Class } from "../types/class.type";
import { AbstractServer } from "../server/server.abstract";
import { Container } from "../container/container";
import { Router as ExpressRouter, Express } from 'express';
import express = require("express");
import { Constructor } from "../types/function.type";
import { inspect } from "util";

export const ExServer = 
<T extends Class<AbstractRouter>, U extends Constructor<AbstractServer>>
(args: {main: T}): any => {

    //registering the main router
    Container.register(args.main);
    return (cstr: U) => {

        const app = express();
        
        const path: string = <string>Container.get(Symbol.for(`${Reflect.get(args.main, 'name')}_path`)),
        router: ExpressRouter = <ExpressRouter>Container.get(Symbol.for(`${Reflect.get(args.main, 'name')}_router`));
        app.use(path, router);

        return class extends cstr {

            protected app: Express = app;
        }
    }
}