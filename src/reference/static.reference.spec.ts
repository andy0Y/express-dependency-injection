import { describe, it } from "mocha";
import { expect } from "chai";
import { StaticReference } from "./static.reference";

describe('StaticReference', () => {

    it('should return the static value referenced', () => {

        const realValue = {test: 'je suis un test'};
        const staticReference: StaticReference = new StaticReference(realValue);
        expect(staticReference.ressource)
        .equal(realValue);
    })
})