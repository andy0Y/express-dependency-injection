import { RouteInterface } from "./route.interface";
import { Request, Response } from "express";
import { ExpressRouteHandler } from "../types/function.type";

export abstract class AbstractRoute implements RouteInterface {

    public handle(): ExpressRouteHandler {

        return (req: Request, res: Response) => {

            this.run(req, res);
        }
    }
    public abstract run(req: Request, res: Response): void;
}