import { MiddlewareInterface } from "./middleware.interface";
import { Request, Response } from "express";
import { ExpressMiddleware } from "../types/function.type";
export declare abstract class AbstractMiddleware implements MiddlewareInterface {
    handle(): ExpressMiddleware;
    abstract run(req: Request, res: Response): any;
}
