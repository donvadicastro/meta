import {ElementBase} from "../../../src/models/components/base/base/element";
import {expect} from "chai";

describe('Models: Element', function () {
    it('should create base component correct', function () {
        var element = new ElementBase({name: 'testComponent'});
        expect('testComponent').to.equal(element.name);
    });
});
