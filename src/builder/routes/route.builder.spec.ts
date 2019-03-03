import { describe } from "mocha";
import { Router } from "express";
import express = require("express");
import { RouteBuilder } from "./route.builder";
import { HttpVerbs } from "../../schema/router/http.verbs.enum";
import { Response, Request } from "express";
import { expect } from "chai";
import * as chai from "chai";
import * as spies from "chai-spies";

chai.use(spies);

describe('RouteBuilder', () => {

    const sandbox = chai.spy.sandbox();
    const router: Router = express.Router();
    const middleware = {handle: () => null, run: () => null};
    const route = (req: Request, res: Response, args?: {body?: Object, params?: Object}) => null;
    before(() => {

        router.get = (...args) => null;
        router.post = (...args) => null;
        router.put = (...args) => null;
        router.delete = (...args) => null;
        router.head = (...args) => null;
        router.options = (...args) => null;
        router.patch = (...args) => null;
        router.trace = (...args) => null;
        router.connect = (...args) => null;
    })

    beforeEach(() => {

        sandbox.on(
            router,
            ['get', 'post', 'put', 'head', 'options', 'delete', 'patch', 'trace', 'connect']
        );
    })
    afterEach(() => {
        
        sandbox.restore();
    })
    it('should bind callback to get on router', () => {
        
        RouteBuilder.build(router, '', HttpVerbs.GET, [], route);
        expect(router.get).to.have.been.called.once;
    })
    it('should bind callback to post on router', () => {
        
        RouteBuilder.build(router, '', HttpVerbs.POST, [], route);
        expect(router.post).to.have.been.called.once;
    })
    it('should bind callback to put on router', () => {
        
        RouteBuilder.build(router, '', HttpVerbs.PUT, [], route);
        expect(router.put).to.have.been.called.once;
    })
    it('should bind callback to delete on router', () => {
        
        RouteBuilder.build(router, '', HttpVerbs.DELETE, [], route);
        expect(router.delete).to.have.been.called.once;
    })
    it('should bind callback to options on router', () => {
        
        RouteBuilder.build(router, '', HttpVerbs.OPTIONS, [], route);
        expect(router.options).to.have.been.called.once;
    })
    it('should bind callback to head on router', () => {
        
        RouteBuilder.build(router, '', HttpVerbs.HEAD, [], route);
        expect(router.head).to.have.been.called.once;
    })
    it('should bind callback to patch on router', () => {
        
        RouteBuilder.build(router, '', HttpVerbs.PATCH, [], route);
        expect(router.patch).to.have.been.called.once;
    })
    it('should bind callback to trace on router', () => {
        
        RouteBuilder.build(router, '', HttpVerbs.TRACE, [], route);
        expect(router.trace).to.have.been.called.once;
    })
    it('should bind callback to connect on router', () => {
        
        RouteBuilder.build(router, '', HttpVerbs.CONNECT, [], route);
        expect(router.connect).to.have.been.called.once;
    })
    it('should call handle on middleware', () => {
        
        sandbox.on(middleware, 'handle');
        RouteBuilder.build(router, '', HttpVerbs.GET, [middleware], route);
        expect(middleware.handle).to.have.been.called.once;
    })
})