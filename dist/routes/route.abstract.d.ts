import { RouteInterface } from "./route.interface";
import { Request, Response } from "express";
import { ExpressRouteHandler } from "../types/function.type";
export declare abstract class AbstractRoute implements RouteInterface {
    handle(): ExpressRouteHandler;
    abstract run(req: Request, res: Response): void;
}
