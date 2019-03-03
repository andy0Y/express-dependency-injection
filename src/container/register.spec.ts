import { describe } from "mocha";
import { register } from "./register";
import { Container } from "./container";
import { expect } from "chai";

describe('register', () => {

    const statics = [
        {key: "value1", value: "value"},
        {key: "value2", value: "value"}
    ]
    it('should register statics in the container', () => {

        register({

            statics: statics
        });
        statics.forEach(statiq => {

            expect(Container.get(Symbol.for(statiq.key)))
            .equal(statiq.value);
        })
    })
})