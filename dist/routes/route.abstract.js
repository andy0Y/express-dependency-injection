"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractRoute {
    handle() {
        return (req, res) => {
            this.run(req, res);
        };
    }
}
exports.AbstractRoute = AbstractRoute;
//# sourceMappingURL=route.abstract.js.map