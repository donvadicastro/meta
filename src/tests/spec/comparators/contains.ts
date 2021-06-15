import {contains} from '../../../app/comparators/contains';
import {expect} from "chai";

describe('Comparators: contains', function () {
	it('should compare correct', function () {
		expect(contains('a', 'abc')).to.be.true;
		expect(contains('abc', 'a')).to.be.true;

		expect(contains(1, [0,1,2])).to.be.true;
		expect(contains([0,1,2], 1)).to.be.true;

		expect(contains([0,1,2], 3)).to.be.false;
		expect(contains('abc', 'd')).to.be.false;
	});
});
