"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractMiddleware {
    handle() {
        return (req, res, next) => {
            let err = null;
            try {
                this.run(req, res);
            }
            catch (thrown) {
                err = thrown;
            }
            err ? next(err) : next();
        };
    }
}
exports.AbstractMiddleware = AbstractMiddleware;
//# sourceMappingURL=middleware.abstract.js.map