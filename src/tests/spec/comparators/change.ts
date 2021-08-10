import {expect} from "chai";
import {change} from "../../../app/comparators";

describe('Comparators: change', () => {
    it('should compare correct', () => {
        expect(change()).to.be.true;
    });
});
