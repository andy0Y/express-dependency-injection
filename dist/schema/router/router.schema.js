"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouterSchema {
    constructor(args) {
        this.path = args.path;
        if (!!args.routes) {
            this.routes = args.routes;
        }
        if (!!args.routers) {
            this.routers = args.routers;
        }
        if (!!args.middlewares) {
            this.middlewares = args.middlewares;
        }
    }
}
exports.RouterSchema = RouterSchema;
//# sourceMappingURL=router.schema.js.map