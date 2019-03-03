import { describe } from "mocha";
import * as chai from "chai";
import * as spies from "chai-spies";
import { AbstractMiddleware } from "./middleware.abstract";
import { NextFunction, Request, Response } from "express";
import { expect } from "chai";

chai.use(spies);

describe('AbstractMiddleware', () => {


    const sandbox = chai.spy.sandbox();
    let errorFlag;
    class Middleware extends AbstractMiddleware {
        public run(req: Request, res: Response) {
            
        }

    }
    const middleware = new Middleware();
    const nextFunction: NextFunction = (err) => errorFlag = err;
    beforeEach(() => {

        errorFlag = undefined;
        sandbox.on(
            middleware,
            ['get', 'post', 'put', 'head', 'options', 'delete', 'patch', 'trace', 'connect']
        );
    })
    afterEach(() => {
        
        sandbox.restore();
    })
    it('should call the function run once and the next function once', () => {

        sandbox.on(
            middleware,
            'run'
        );
        const spynext = chai.spy(nextFunction)
        middleware.handle()(null, null, spynext);
        expect(middleware.run).to.have.been.called.once;
        expect(spynext).to.have.been.called.once;
    })
    it('should call the function run once and call next with error message if run throws', () => {

        sandbox.on(
            middleware,
            'run',
            () => {throw new Error('error');}
        );
        const spynext = chai.spy(nextFunction)
        middleware.handle()(null, null, spynext);
        expect(middleware.run).to.have.been.called.once;
        expect(spynext).to.have.been.called.once;
        expect(!!errorFlag)
        .equal(true);
    })
})