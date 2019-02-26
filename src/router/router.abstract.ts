import { Router as ExpressRouter } from 'express';
import { RouterSchema } from '../schema/router/router.schema';
import { RouteBuilder } from '../builder/routes/route.builder';
import { Request, Response } from "express";

import express = require('express');

export abstract class AbstractRouter {

    [arg: string]: (req: Request, res: Response, args?: {body?: Object, args?: Object}) => void
}