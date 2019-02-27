import { Router as ExpressRouter } from 'express';
import { Request, Response } from "express";

import express = require('express');

export abstract class AbstractRouter {

    [arg: string]: (req: Request, res: Response, args?: {body?: Object, args?: Object}) => void;
    public getExpressRouter(): {path: string, router: ExpressRouter} | void {

    }
}