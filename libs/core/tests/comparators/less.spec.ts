import {less} from '../../src/comparators';
import {expect} from "chai";

describe('Comparators: less', function () {
	it('should compare correct', function () {
		expect(less(10,11)).to.be.true;
		expect(less(11,11)).to.be.false;
		expect(less(11,10)).to.be.false;

		expect(less('a', 'b')).to.be.true;
		expect(less('A', 'a')).to.be.true;
		expect(less('b', 'a')).to.be.false;
	});
});
