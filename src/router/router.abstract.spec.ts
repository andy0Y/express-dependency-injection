import { describe } from "mocha";
import * as chai from "chai";
import * as spies from "chai-spies";
import { AbstractRouter } from "./router.abstract";
import { expect } from "chai";

chai.use(spies);

describe('AbstractRouter', () => {

    it('should implements the getExpressRouter method', () => {

        const sandbox = chai.spy.sandbox();
        class Test extends AbstractRouter {

        }
        const test = new Test();
        sandbox.on(test, 'getExpressRouter');
        test.getExpressRouter();
        expect(test.getExpressRouter)
        .to.have.been.called.once;
        sandbox.restore();
    })
})