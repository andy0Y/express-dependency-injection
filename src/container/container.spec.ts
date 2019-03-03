import { Container } from "./container";
import { ReferenceSchema } from "../schema/reference/reference.schema";
import { expect } from "chai";
import { RessourceNotFoundError } from "../errors/ressource-not-found.error";

describe('Container', () => {

    class Test {

    }
    class ThisIsError {

    }
    beforeEach(() => {

        Reflect.set(Container, '_ressources', []);
        Reflect.set(Container, '_ressourcesProtected', []);
    })
    it('should register a static into the container inner object', () => {

        Reflect.set(Container, '_ressources', [{selector: Symbol.for('stub'), ressource: {}}]);
        Container.registerStatic('test', 'test');
        const ressources: Array<ReferenceSchema> = Reflect.get(Container, '_ressources');
        const schema = <ReferenceSchema>ressources.find(ref => ref.selector === Symbol.for('test'));
        expect(schema.ressource.ressource)
        .equal('test');
    })
    it('should not overwrite a static reference if already set', () => {

        Container.registerStatic('test', 'test');
        Container.registerStatic('test', 'error');
        const ressources: Array<ReferenceSchema> = Reflect.get(Container, '_ressources');
        const schema = <ReferenceSchema>ressources.find(ref => ref.selector === Symbol.for('test'));
        expect(schema.ressource.ressource)
        .equal('test');
    })
    it('should register a protected static into the container inner object', () => {

        Container.registerProtectedStatic('test', 'test');
        const ressources: Array<ReferenceSchema> = Reflect.get(Container, '_ressourcesProtected');
        const schema = <ReferenceSchema>ressources.find(ref => ref.selector === Symbol.for('test'));
        expect(schema.ressource.ressource)
        .equal('test');
    })
    it('should not overwrite a protected static reference if already set', () => {

        Container.registerProtectedStatic('test', 'test');
        Container.registerProtectedStatic('test', 'error');
        const ressources: Array<ReferenceSchema> = Reflect.get(Container, '_ressourcesProtected');
        const schema = <ReferenceSchema>ressources.find(ref => ref.selector === Symbol.for('test'));
        expect(schema.ressource.ressource)
        .equal('test');
    })
    it('should register a class reference without intanciating it', () => {

        Container.register(Test);
        const ressources: Array<ReferenceSchema> = Reflect.get(Container, '_ressources');
        const schema = <ReferenceSchema>ressources.find(ref => ref.selector === Symbol.for(Reflect.get(Reflect.getPrototypeOf(Test), 'name')));
        expect(schema.ressource._inner)
        .equal(null);
    })
    it('should register a class instanciable into the container inner object', () => {

        Container.register(Test);
        const ressources: Array<ReferenceSchema> = Reflect.get(Container, '_ressources');
        const schema = <ReferenceSchema>ressources.find(ref => ref.selector === Symbol.for(Reflect.get(Reflect.getPrototypeOf(Test), 'name')));
        expect(schema.ressource.ressource)
        .to.be.an.instanceof(Test);
    })
    it('should retrieve a class instance if class type is registered', () => {

        Container.register(Test);

        expect(Container.get(Test))
        .to.be.an.instanceof(Test);
    })
    it('should retrieve a static if static is registered', () => {

        Container.registerStatic('test', 'test');

        expect(Container.get(Symbol.for('test')))
        .equal('test');
    })
    it('should retrieve a protected static if protected static is registered', () => {

        Container.registerProtectedStatic('test', 'test');

        expect(Container.get(Symbol.for('test')))
        .equal('test');
    })
    it('should retrieve a class instance if class type is registered', () => {

        Container.register(Test);

        expect(Container.get(Test))
        .to.be.an.instanceof(Test);
    })
    it('should throw a RessourceNotFoundError is no ressource is not found', () => {

        expect(() => Container.get(ThisIsError))
        .to.throw(RessourceNotFoundError);
    })
    
})