import {ElementBase} from "../../../../app/models/components/base/base/element";

describe('Models: Element', function () {
    it('should create base component correct', function () {
        var element = new ElementBase({name: 'testComponent'});
        expect('testComponent').toBe(element.name);
    });
});