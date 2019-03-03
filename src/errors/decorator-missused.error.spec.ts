import { expect } from "chai";
import { DecoratorMissusedError } from "./decorator.missused.error";

describe('DecoratorMissusedError', () => {

    it('should throw a DecoratorMissusedError error given a decorator name and a target', () => {

        expect(() => {

            throw new DecoratorMissusedError('decorator', 'Class');
        })
        .to.throw(DecoratorMissusedError);
    })
})