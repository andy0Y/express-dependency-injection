import { describe } from "mocha";
import { AbstractServer } from "./server.abstract";
import * as chai from "chai";
import * as spies from "chai-spies";
import { expect } from "chai";

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
})