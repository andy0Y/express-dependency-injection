"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../container/container");
const express = require("express");
const decorator_missused_error_1 = require("../errors/decorator.missused.error");
exports.ExServer = (args) => {
    //registering the main router
    container_1.Container.register(args.main);
    return (cstr) => {
        if (Reflect.get(Reflect.getPrototypeOf(cstr), 'name') === 'AbstractServer') {
            const app = express();
            const subRouterInfo = container_1.Container.get(args.main).getExpressRouter();
            app.use(subRouterInfo.path, subRouterInfo.router);
            return class extends cstr {
                constructor() {
                    super(...arguments);
                    this.app = app;
                }
            };
        }
        else {
            throw new decorator_missused_error_1.DecoratorMissusedError('ExServer', 'anything other than extension of AbstractServer');
        }
    };
};
//# sourceMappingURL=server.decorator.js.map