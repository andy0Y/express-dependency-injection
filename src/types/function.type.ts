import { Request, Response, NextFunction } from "express";

export type ExpressMiddleware = (req: Request, res: Response, next: NextFunction)=> void;

export type ExpressRouteHandler = (req: Request, res: Response)=> void;