import { AbstractRouter } from "../router/router.abstract";
import { ExRouter } from "./router.decorator";
import { ExRoute } from "./route.decorator";
import { HttpVerbs } from "../enums/http.verbs.enum";
import { AbstractMiddleware } from "../middlewares/middleware.abstract";
import { ExMiddleware } from "./middleware.decorator";
import { Request, Response, Router } from "express";
import { expect } from "chai";
import { Container } from "../container/container";
import { DecoratorMissusedError } from "../errors/decorator.missused.error";

describe('ExRouter', () => {

    afterEach(() => {
        
        Reflect.set(Container, '_ressources', []);
        Reflect.set(Container, '_ressourcesProtected', []);
    })
    it(`should return a class with a function returning a router containing routes specified 
    in the class with specified middlewares and the specified path `, () => {

        @ExMiddleware()
        class MiddleWare extends AbstractMiddleware {

            public run(req: Request, res: Response) {
                throw new Error("Method not implemented.");
            }

        }

        @ExRouter({
            path: '/path'
        })
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
        const descriptor = <{path: string, router: Router}>test.getExpressRouter();
        expect(<any>descriptor.path)
        .equal('/path');

        // tricky, but since there is only one route, if we take the first one and the function
        //stack length is two, it means it as registered both route and middleware
        expect(descriptor.router.stack.map(element => {
            
            return element.route.stack;
            
        }).pop().length)
        .equal(2);
    })
    it('should register middleware in the container and bind it to the inner router', () => {

        @ExMiddleware()
        class MiddleWare extends AbstractMiddleware {

            public run(req: Request, res: Response) {
                throw new Error("Method not implemented.");
            }

        }

        @ExRouter({
            path: '/path',
            middlewares: [MiddleWare]
        })
        class Test extends AbstractRouter {

        }
        const test = new Test();
        const descriptor = <{path: string, router: Router}>test.getExpressRouter();

        // tricky, but since there is only one middleware, if we take the router stack
        //and it's length is one, it means it as registered the middleware
        expect(descriptor.router.stack.length)
        .equal(1);
        expect(Container.get(MiddleWare))
        .to.be.an.instanceof(MiddleWare);
    })
    it('should register router in the container and bind it to the inner router', () => {

        @ExRouter({
            path: '/path'
        })
        class Router extends AbstractRouter {

        }

        @ExRouter({
            path: '/path',
            routers: [Router]
        })
        class Test extends AbstractRouter {

        }
        const test = new Test();
        const descriptor = <{path: string, router: Router}><unknown>test.getExpressRouter();

        // tricky, but since there is only one sub-router, if we take the router stack
        //and it's length is one, it means it as registered the sub-router
        expect((<any>descriptor.router.stack).length)
        .equal(1);
        expect(Container.get(Router))
        .to.be.an.instanceof(Router);
    })
    it('should throw a DecoratorMissusedError Error if decorating a class witch doesn\'t extends AbstractRouter', () => {

        expect(() => {

            @ExRouter({
                path: '/path'
            })
            class Test {
                
            }
            const test = new Test();
        })
        .to.throw(DecoratorMissusedError);
    })
})