import { describe } from "mocha";
import { Container } from "../container/container";
import { register } from "../container/register";
import { Inject } from "./inject.decorator";
import { expect } from "chai";


describe('Inject', () => {

    class ToInject {

    }
    const staticValue = 'test';
    beforeEach(() => {
        
        register({statics: [{key: 'test', value: staticValue}]})
    })
    afterEach(() => {
        
        Reflect.set(Container, '_ressources', []);
    })
    it('shoud inject a static into a class property as a getter', () => {

        class Test {

            @Inject('test')
            public test: string;
        }
        const test = new Test();
        expect(test.test).equal(staticValue);
        expect(Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(test), 'test').get)
        .to.be.an.instanceof(Function);
    })
    it('shoud inject a class into a class property as a getter after registering it in container', () => {

        class Test {

            @Inject(ToInject)
            public test: string;
        }
        const test = new Test();
        expect(test.test)
        .to.be.an.instanceof(ToInject);
        expect(Container.get(ToInject))
        .to.be.an.instanceof(ToInject);
        expect(Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(test), 'test').get)
        .to.be.an.instanceof(Function);
    })
    it('shoud inject a static into a class getter as a getter', () => {

        class Test {

            @Inject('test')
            public get test() {
                return 'not the good value';
            }
        }
        const test = new Test();
        expect(test.test).equal(staticValue);
        expect(Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(test), 'test').get)
        .to.be.an.instanceof(Function);
    })
    it('shoud inject a class into a class getter as a getter after registering it in container', () => {

        class Test {

            @Inject(ToInject)
            public get test() {
                return 'not the good value';
            }
        }
        const test = new Test();
        expect(test.test)
        .to.be.an.instanceof(ToInject);
        expect(Container.get(ToInject))
        .to.be.an.instanceof(ToInject);
        expect(Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(test), 'test').get)
        .to.be.an.instanceof(Function);
    })
    it('shoud inject a static into a class method as a function returning the value', () => {

        class Test {

            @Inject('test')
            public test() {
                return 'not the good value';
            }
        }
        const test = new Test();
        expect(test.test()).equal(staticValue);
        expect(Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(test), 'test').value)
        .to.be.an.instanceof(Function);
    })
    it('shoud inject a class into a class getter as a function returning the value after registering it in container', () => {

        class Test {

            @Inject(ToInject)
            public test() {
                return 'not the good value';
            }
        }
        const test = new Test();
        expect(test.test())
        .to.be.an.instanceof(ToInject);
        expect(Container.get(ToInject))
        .to.be.an.instanceof(ToInject);
        expect(Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(test), 'test').value)
        .to.be.an.instanceof(Function);
    })
    it('shoud register a static into a constructor metadata', () => {

        class Test {

            constructor(@Inject('test')public readonly test?: string) {

            }
        }
        const test = new Test();
        const constructorName = Reflect.get(Reflect.getPrototypeOf(test).constructor, 'name');
        const index = 0;
        expect(Reflect.getOwnMetadata(Symbol.for(`${constructorName}_${index}`), Reflect.getPrototypeOf(test).constructor))
        .equal(staticValue);
    })
    it('shoud inject a class into a class getter as a function returning the value after registering it in container', () => {

        class Test {

            constructor(@Inject(ToInject)public readonly test?: ToInject) {

            }
        }
        const test = new Test();
        const constructorName = Reflect.get(Reflect.getPrototypeOf(test).constructor, 'name');
        const index = 0;
        expect(Reflect.getOwnMetadata(Symbol.for(`${constructorName}_${index}`), Reflect.getPrototypeOf(test).constructor))
        .to.be.an.instanceof(ToInject);
        expect(Container.get(ToInject))
        .to.be.an.instanceof(ToInject);
    })
})