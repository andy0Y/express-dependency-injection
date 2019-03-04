"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractServer {
    listen(port, callback) {
        return this.app.listen(port, callback ? callback : undefined);
    }
}
exports.AbstractServer = AbstractServer;
//# sourceMappingURL=server.abstract.js.map