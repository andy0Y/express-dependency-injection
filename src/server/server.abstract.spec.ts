import { describe } from "mocha";
import { AbstractServer } from "./server.abstract";
import { ExRouter } from "../decorators/router.decorator";
import { ExServer } from "../decorators/server.decorator";
import * as chai from "chai";
import * as spies from "chai-spies";
import { expect } from "chai";
import { inspect } from "util";
import { AbstractRouter } from "../router/router.abstract";

chai.use(spies);

describe('AbstractServer', () => {

    it('should call listen on inner server when listen is called', () => {

        class App extends AbstractServer {

        }
        const test = new App();
        const stub = () => null;
        const spyStub = chai.spy(stub);
        Reflect.set(test, 'app', {listen: spyStub});
        test.listen(3000);
        expect(spyStub).to.have.been.called.once;
    })
    it('should call listen callback if specified', () => {

        class App extends AbstractServer {

        }
        const test = new App();
        const stub = () => null;
        const spyStub = chai.spy(stub);
        Reflect.set(test, 'app', {listen: (port, callback) => callback()});
        test.listen(3000, spyStub);
        expect(spyStub).to.have.been.called.once;
    })

    it('should register static ressources with and without virtual path', () => {

        @ExRouter({
            path: '/'
        })
        class EmptyRouter extends AbstractRouter {


        }

        @ExServer({
            main: EmptyRouter
        })
        class App extends AbstractServer {

        }
        const fakeStatics = [{
            path: '/main',
            dir: './fake1'
        },{
            path: '/main',
            dir: './fake2'
        }],
        test = new App();
        test.addStatics(fakeStatics);
        // two static routes registered, plus 3 natives, so it should be 5
        expect(Reflect.get(test, 'app')._router.stack.length).equal(5);
    })
})