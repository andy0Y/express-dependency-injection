"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouteSchema {
    constructor(args) {
        this.verb = args.verb;
        this.path = args.path;
        this.route = args.route;
        if (!!args.middlewares) {
            this.middlewares = args.middlewares;
        }
    }
}
exports.RouteSchema = RouteSchema;
//# sourceMappingURL=route.schema.js.map