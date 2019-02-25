import { AbstractMiddleware } from "../middleware.abstract";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { InvalidFunctionCallException } from "../../exceptions/invalid.function.call.exception";
import { ExpressMiddleware } from "../../types/function.type";

export class BodyParserMiddleware extends AbstractMiddleware {

    public handle(): ExpressMiddleware {

        return bodyParser.json();
    }

    public run(_req: Request, _res: Response) {

        throw new InvalidFunctionCallException('this function is not implemented for this middleware');
    }


}