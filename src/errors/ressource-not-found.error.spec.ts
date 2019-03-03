import { expect } from "chai";
import { RessourceNotFoundError } from "./ressource-not-found.error";

describe('RessourceNotFoundError', () => {

    it('should throw a RessourceNotFoundError error given a symbol key', () => {

        expect(() => {

            throw new RessourceNotFoundError(Symbol.for('Class'));
        })
        .to.throw(RessourceNotFoundError);
    })
    it('should throw a RessourceNotFoundError error given a Class', () => {

        expect(() => {

            class Test {

            }
            throw new RessourceNotFoundError(Test);
        })
        .to.throw(RessourceNotFoundError);
    })
})