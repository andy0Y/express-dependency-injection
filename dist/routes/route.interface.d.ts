import { Response, Request } from "express";
import { ExpressRouteHandler } from "../types/function.type";
export interface RouteInterface {
    handle(): ExpressRouteHandler;
    run(req: Request, res: Response): any;
}
