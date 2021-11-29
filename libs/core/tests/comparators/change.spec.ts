import {expect} from "chai";
import {change} from "../../src/comparators";

describe('Comparators: change', () => {
    it('should compare correct', () => {
        expect(change()).to.be.true;
    });
});
