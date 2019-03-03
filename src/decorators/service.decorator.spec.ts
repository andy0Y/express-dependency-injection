import { describe } from "mocha";
import { Service } from "./service.decorator";
import { expect } from "chai";
import { register } from "../container/register";
import { Container } from "../container/container";
import { Inject } from "./inject.decorator";

describe('Service', () => {

    const staticValue = 'test';
    class ToInject {

    }
    beforeEach(() => {
        
        register({statics: [{key: 'test', value: staticValue}]})
    })
    afterEach(() => {
        
        Reflect.set(Container, '_ressources', []);
    })
    it('should return an anonymous class extending the decorated class', () => {

        @Service()
        class Test {

        }
        const test = new Test();
        expect(Reflect.get(Reflect.getPrototypeOf(test).constructor, 'name'))
        .equal('Test');
    })
    it('should has injected parameters instanciated', () => {

        @Service()
        class Test {

            constructor(
                @Inject('test') public testStatic?: string,
                @Inject(ToInject) public testClass?: ToInject) {

            }
        }
        const test = new Test();
        expect(test.testStatic)
        .equal(staticValue)
        expect(test.testClass)
        .to.be.an.instanceof(ToInject)
    })
})