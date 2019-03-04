"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
exports.register = (args) => {
    args.statics.forEach(ztatic => container_1.Container.registerStatic(ztatic.key, ztatic.value));
};
//# sourceMappingURL=register.js.map