import { Response, Request } from "express";
import { ExpressMiddleware } from "../types/function.type";
export interface MiddlewareInterface {
    handle(): ExpressMiddleware;
    run(req: Request, res: Response): any;
}
