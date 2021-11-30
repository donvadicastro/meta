import {greater} from '../../src/comparators';
import {expect} from "chai";

describe('Comparators: greater', function () {
	it('should compare correct', function () {
		expect(greater(10,11)).to.be.false;
		expect(greater(11,11)).to.be.false;
		expect(greater(11,10)).to.be.true;

		expect(greater('a', 'b')).to.be.false;
		expect(greater('A', 'a')).to.be.false;
		expect(greater('b', 'a')).to.be.true;
	});
});
