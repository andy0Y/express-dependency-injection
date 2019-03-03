import { Router as ExpressRouter } from 'express';
import { Request, Response } from "express";
import { RepositoryInterface } from '../repository/repository.interface';

export abstract class AbstractRouter {

    [arg: string]: ((req: Request, res: Response, args: {body: any, params: any}) => void)
    | ((req: Request, res: Response) => void)
    | RepositoryInterface<any>
    | {path: string, router: ExpressRouter};
    public getExpressRouter(): {path: string, router: ExpressRouter} | void {

    }
}