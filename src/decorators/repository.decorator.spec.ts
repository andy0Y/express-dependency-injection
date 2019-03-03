import { Request, Response } from "express";
import { Container } from "../container/container";
import { expect } from "chai";
import { register } from "../container/register";
import { Inject } from "./inject.decorator";
import { Service } from "./service.decorator";
import { DecoratorMissusedError } from "../errors/decorator.missused.error";
import { Repository } from "../mixin/repository.mixin";
import { ExRepository } from "./repository.decorator";

describe('ExRepository', () => {

    const staticValue = 'test';
    beforeEach(() => {
        
        register({statics: [{key: 'test', value: staticValue}]});
    })
    afterEach(() => {
        
        Reflect.set(Container, '_ressources', []);
    })
    it('class should be injectable with parameters if decorated', () => {

        class GenRepo {

        }

        @ExRepository()
        class Test extends Repository(GenRepo) {

            constructor(@Inject('test') public test?: string) {super()}
            
            public getModel(model: {}) {
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
    it('should throw a DecoratorMissusedError Error if used on a class that doesn\'t extends the Repository mixin', () => {

        expect(() => {
            
            @ExRepository()
            class Test {
    
            }
            new Test()
        })
        .to.throw(DecoratorMissusedError);
    })
})