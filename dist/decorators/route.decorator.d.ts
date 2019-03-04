import { HttpVerbs } from "../enums/http.verbs.enum";
import { AbstractMiddleware } from "../middlewares/middleware.abstract";
import { Class } from "../types/class.type";
import { AbstractRouter } from "../router/router.abstract";
export declare const ExRoute: <T extends Class<AbstractMiddleware>, U extends AbstractRouter>(args: {
    path: string;
    verb: HttpVerbs;
    middlewares?: T[];
}) => (target: U, propertyKey: string, descriptor: PropertyDescriptor) => void;
