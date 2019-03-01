import { Router as ExpressRouter } from 'express';
import { HttpVerbs } from "../../schema/router/http.verbs.enum";
import { Response, Request } from "express";
import { AbstractMiddleware } from "../../middlewares/middleware.abstract";

export abstract class RouteBuilder {

    public static build(
        router: ExpressRouter,
        path: string,
        verb: HttpVerbs,
        middlewares: Array<AbstractMiddleware>,
        route: (req: Request, res: Response, args?: {body?: Object, params?: Object}) => void) {

        const middlewaresFuncs = middlewares ?
        middlewares.map(middleware => middleware.handle()) :
        [];
        const handlerNoBody = (req: Request, res: Response) => {

            route(req, res, {params: req.params});
        };
        const handlerWithBody = (req: Request, res: Response) => {

            route(req, res, {body: req.body, params: req.params});
        };
        if(verb === HttpVerbs.GET) {

            router.get(path, middlewaresFuncs, handlerNoBody);
        } else if(verb === HttpVerbs.POST) {

            router.post(path, middlewaresFuncs, handlerWithBody);
        } else if(verb === HttpVerbs.PUT) {

            router.put(path, middlewaresFuncs, handlerWithBody);
        } else if(verb === HttpVerbs.DELETE) {

            router.delete(path, middlewaresFuncs, handlerNoBody);
        } else if(verb === HttpVerbs.OPTIONS) {

            router.options(path, middlewaresFuncs, handlerNoBody);
        } else if(verb === HttpVerbs.HEAD) {

            router.head(path, middlewaresFuncs, handlerNoBody);
        } else if(verb === HttpVerbs.PATCH) {

            router.patch(path, middlewaresFuncs, handlerWithBody);
        } else if(verb === HttpVerbs.TRACE) {

            router.trace(path, middlewaresFuncs, handlerNoBody);
        } else if(verb === HttpVerbs.CONNECT) {

            router.connect(path, middlewaresFuncs, handlerNoBody);
        }
    }
}