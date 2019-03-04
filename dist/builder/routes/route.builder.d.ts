import { Router as ExpressRouter } from 'express';
import { HttpVerbs } from "../../schema/router/http.verbs.enum";
import { Response, Request } from "express";
import { AbstractMiddleware } from "../../middlewares/middleware.abstract";
export declare abstract class RouteBuilder {
    static build(router: ExpressRouter, path: string, verb: HttpVerbs, middlewares: Array<AbstractMiddleware>, route: (req: Request, res: Response, args?: {
        body?: Object;
        params?: Object;
    }) => void): void;
}
