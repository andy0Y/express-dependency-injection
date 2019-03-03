import { ExRouter } from "./router.decorator";
import { AbstractRouter } from "../router/router.abstract";
import { ExServer } from "./server.decorator";
import { AbstractServer } from "../server/server.abstract";
import { expect } from "chai";
import { Express } from "express";
import { Container } from "../container/container";
import { inspect } from "util";
import { DecoratorMissusedError } from "../errors/decorator.missused.error";

describe('ExServer', () => {

    it('should register the main router into the container and return an Express server, with the router binded', () => {

        @ExRouter({
            path: '/path'
        })
        class Router extends AbstractRouter {

        }

        @ExServer({
            main: Router
        })
        class App extends AbstractServer {

        }
        const test = new App();
        const server: Express = Reflect.get(test, 'app');
        expect(Container.get(Router))
        .to.be.an.instanceof(Router);
        // tricky, but since there is only one router, if we filter the inner layer,
        //and take the first one and the function
        //stack length is one, it means it as registered the router
        expect(server._router.stack
        .filter(layer => layer.name !== 'query' && layer.name !== 'expressInit').length)
        .equal(1);
    })
    it('should throw a DecoratorMissusedError Error if decorating a class witch doesn\'t extends AbstractServer', () => {

        expect(() => {

            @ExRouter({
                path: '/path'
            })
            class Router extends AbstractRouter {
    
            }

            @ExServer({
                main: Router
            })
            class App {
    
            }
            const test = new App();
        })
        .to.throw(DecoratorMissusedError);
    })
})