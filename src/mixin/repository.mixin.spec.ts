import { Repository } from "./repository.mixin";
import { expect } from "chai";

describe('Repository', () => {

    it('should implements getModel Method and pass wrapped object properties', () => {

        const model = 'stub';
        class Wrapped {

            public test: string = 'test';
        }
        class Test extends Repository(Wrapped) {

            public getModel(model: {}) {
                
                return model;
            }
        }
        const test = new Test();
        expect(test.test)
        .equal('test');
        expect(test.getModel(model))
        .equal(model);
    })
})