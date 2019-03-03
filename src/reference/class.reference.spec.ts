import { describe, it } from "mocha";
import { expect } from "chai";
import { ClassReference } from "./class.reference";

describe('ClassReference', () => {

    class Test {

    }
    let classReference: ClassReference<Test>;
    before(() => {

        classReference = new ClassReference(Test)
    })

    it('should instanciate the class', () => {

        expect(classReference.ressource)
        .to.be.an.instanceof(Test);
    })

    it('should return the same instance every time', () => {

        expect(classReference.ressource)
        .equal(classReference.ressource);
    })
})