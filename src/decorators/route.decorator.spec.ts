import { ExRoute } from "./route.decorator";
import { Request, Response } from "express";
import { HttpVerbs } from "../enums/http.verbs.enum";
import { AbstractRouter } from "../router/router.abstract";
import { Container } from "../container/container";
import { expect } from "chai";
import { Service } from "./service.decorator";
import { ExMiddleware } from "./middleware.decorator";
import { AbstractMiddleware } from "../middlewares/middleware.abstract";

describe('ExRoute', () => {

    afterEach(() => {
        
        Reflect.set(Container, '_ressources', []);
        Reflect.set(Container, '_ressourcesProtected', []);
    })
    it('should register route path and verb in container protected statics ressources', () => {

        @Service()
        class Test extends AbstractRouter {

            @ExRoute({
                path: '/path',
                verb: HttpVerbs.GET
            })
            public route() {

            }
        }
        const test = new Test();
        const className = Reflect.get(Reflect.getPrototypeOf(Test), 'name');
        expect(Container.get(Symbol.for(`${className}_route_path`)))
        .equal('/path');
        expect(Container.get(Symbol.for(`${className}_route_verb`)))
        .equal(HttpVerbs.GET);
    })
    it('should register middleware classes list in container protected statics ressources an register them on container', () => {

        @ExMiddleware()
        class MiddleWare extends AbstractMiddleware {

            public run(req: Request, res: Response) {
                throw new Error("Method not implemented.");
            }

        }

        @Service()
        class Test extends AbstractRouter {

            @ExRoute({
                path: '/path',
                verb: HttpVerbs.GET,
                middlewares: [MiddleWare]
            })
            public route() {

            }
        }
        const test = new Test();
        const className = Reflect.get(Reflect.getPrototypeOf(Test), 'name');
        expect(Container.get(Symbol.for(`${className}_route`)))
        .to.eql([MiddleWare]);
        expect(Container.get(MiddleWare))
        .to.be.an.instanceof(MiddleWare);
    })
})