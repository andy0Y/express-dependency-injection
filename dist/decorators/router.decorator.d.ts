import { Class } from "../types/class.type";
import { AbstractRouter } from "../router/router.abstract";
import { AbstractMiddleware } from "../middlewares/middleware.abstract";
export declare const ExRouter: <T extends Class<AbstractRouter>, U extends Class<AbstractMiddleware>, V extends Class<AbstractRouter>>(args: {
    path: string;
    middlewares?: U[];
    routers?: T[];
}) => any;
