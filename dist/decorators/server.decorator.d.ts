import { AbstractRouter } from "../router/router.abstract";
import { Class } from "../types/class.type";
import { AbstractServer } from "../server/server.abstract";
import { Constructor } from "../types/function.type";
export declare const ExServer: <T extends Class<AbstractRouter>, U extends Constructor<AbstractServer>>(args: {
    main: T;
}) => any;
