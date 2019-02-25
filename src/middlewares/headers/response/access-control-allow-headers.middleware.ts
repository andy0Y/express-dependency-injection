import { AbstractMiddleware } from "../../middleware.abstract";
import { Request, Response } from "express";

export class AccessControlAllowHeadersMiddleware extends AbstractMiddleware {

    public run(req: Request, res: Response) {

        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
}