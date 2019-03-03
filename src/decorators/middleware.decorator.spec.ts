import { AbstractMiddleware } from "../middlewares/middleware.abstract";
import { Request, Response } from "express";
import { Container } from "../container/container";
import { expect } from "chai";
import { ExMiddleware } from "./middleware.decorator";
import { register } from "../container/register";
import { Inject } from "./inject.decorator";
import { Service } from "./service.decorator";
import { DecoratorMissusedError } from "../errors/decorator.missused.error";

describe('ExMiddleware', () => {

    const staticValue = 'test';
    beforeEach(() => {
        
        register({statics: [{key: 'test', value: staticValue}]});
    })
    afterEach(() => {
        
        Reflect.set(Container, '_ressources', []);
    })
    it('class should be injectable with parameters if decorated', () => {

        @ExMiddleware()
        class Test extends AbstractMiddleware {

            constructor(@Inject('test') public test?: string) {super()}

            public run(req: Request, res: Response) {
                throw new Error("Method not implemented.");
            }
        }
        @Service()
        class ToTest {

            constructor(@Inject(Test) public test?: Test) {

            }
        }
        const test = new ToTest();
        expect(Container.get(Test))
        .to.be.an.instanceof(Test);
        expect(test.test)
        .to.be.an.instanceof(Test);
    })
    it('should throw a DecoratorMissusedError Error if used on a class that doesn\'t extends AbstractMiddleware', () => {

        expect(() => {
            
            @ExMiddleware()
            class Test {
    
            }
            new Test()
        })
        .to.throw(DecoratorMissusedError);
    })
})