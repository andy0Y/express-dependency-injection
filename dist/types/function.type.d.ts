import { Request, Response, NextFunction } from "express";
export declare type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => void;
export declare type ExpressRouteHandler = (req: Request, res: Response) => void;
export declare type Constructor<T = {}> = new (...args: any[]) => T;
