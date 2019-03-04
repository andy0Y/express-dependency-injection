import { AbstractMiddleware as abstractMiddleware } from "./middlewares/middleware.abstract";
import { AbstractRouter as abstractRouter } from "./router/router.abstract";
import { AbstractServer as abstractServer } from "./server/server.abstract";
import { HttpVerbs as httpVerbs } from "./enums/http.verbs.enum";
export declare const Inject: (paramTarget: string | import("./types/class.type").Class<import("./service/service.inteface").ServiceInterface>) => (target: any, propertyKey: string | symbol, indexOrDescriptor?: number | PropertyDescriptor) => void;
export declare const Service: () => <T extends import("./types/class.type").Class<{}>>(cstr: T) => {
    new (..._args: any[]): {};
} & T;
export declare const ExMiddleware: <T extends import("./types/class.type").Class<abstractMiddleware>>() => any;
export declare const ExRepository: <U extends import("./model/model.interface").ModelInterface, T extends import("./types/class.type").Class<import("./repository/repository.interface").RepositoryInterface<U>>>() => any;
export declare const ExRoute: <T extends import("./types/class.type").Class<abstractMiddleware>, U extends abstractRouter>(args: {
    path: string;
    verb: httpVerbs;
    middlewares?: T[];
}) => (target: U, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const ExRouter: <T extends import("./types/class.type").Class<abstractRouter>, U extends import("./types/class.type").Class<abstractMiddleware>, V extends import("./types/class.type").Class<abstractRouter>>(args: {
    path: string;
    middlewares?: U[];
    routers?: T[];
}) => any;
export declare const ExServer: <T extends import("./types/class.type").Class<abstractRouter>, U extends import("./types/function.type").Constructor<abstractServer>>(args: {
    main: T;
}) => any;
export declare const register: (args: {
    statics: {
        key: string;
        value: import("./types/primitive.type").Primitive;
    }[];
}) => void;
export declare const AbstractMiddleware: typeof abstractMiddleware;
export declare const AbstractRouter: typeof abstractRouter;
export declare const AbstractServer: typeof abstractServer;
export declare const Repository: <T extends import("./types/function.type").Constructor<{}>, U extends import("./model/model.interface").ModelInterface>(target: T) => {
    new (...args: any[]): {
        getModel(model: U): any;
    };
} & T;
export declare const HttpVerbs: typeof httpVerbs;
