"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_verbs_enum_1 = require("../../schema/router/http.verbs.enum");
class RouteBuilder {
    static build(router, path, verb, middlewares, route) {
        const middlewaresFuncs = middlewares.map(middleware => middleware.handle());
        /* istanbul ignore next */
        const handlerNoBody = (req, res) => {
            route(req, res, { params: req.params });
        };
        /* istanbul ignore next */
        const handlerWithBody = (req, res) => {
            route(req, res, { body: req.body, params: req.params });
        };
        if (verb === http_verbs_enum_1.HttpVerbs.GET) {
            router.get(path, middlewaresFuncs, handlerNoBody);
        }
        else if (verb === http_verbs_enum_1.HttpVerbs.POST) {
            router.post(path, middlewaresFuncs, handlerWithBody);
        }
        else if (verb === http_verbs_enum_1.HttpVerbs.PUT) {
            router.put(path, middlewaresFuncs, handlerWithBody);
        }
        else if (verb === http_verbs_enum_1.HttpVerbs.DELETE) {
            router.delete(path, middlewaresFuncs, handlerNoBody);
        }
        else if (verb === http_verbs_enum_1.HttpVerbs.OPTIONS) {
            router.options(path, middlewaresFuncs, handlerNoBody);
        }
        else if (verb === http_verbs_enum_1.HttpVerbs.HEAD) {
            router.head(path, middlewaresFuncs, handlerNoBody);
        }
        else if (verb === http_verbs_enum_1.HttpVerbs.PATCH) {
            router.patch(path, middlewaresFuncs, handlerWithBody);
        }
        else if (verb === http_verbs_enum_1.HttpVerbs.TRACE) {
            router.trace(path, middlewaresFuncs, handlerNoBody);
        }
        else if (verb === http_verbs_enum_1.HttpVerbs.CONNECT) {
            router.connect(path, middlewaresFuncs, handlerNoBody);
        }
    }
}
exports.RouteBuilder = RouteBuilder;
//# sourceMappingURL=route.builder.js.map