import { MiddlewareInterface } from "./middleware.interface";
import { NextFunction, Request, Response } from "express";
import { ExpressMiddleware } from "../types/function.type";

export abstract class AbstractMiddleware implements MiddlewareInterface {

    public handle(): ExpressMiddleware {

        return (req: Request, res: Response, next: NextFunction) => {

            let err = null;
            try {
    
                this.run(req, res);
            } catch(thrown) {
    
                err = thrown;
            }
            err ? next(err) : next();
        };
    }
    public abstract run(req: Request, res: Response): any;
}