import {eq} from '../../src/comparators';
import {expect} from "chai";

describe('Comparators: eq', function () {
	it('should compare correct', function () {
		expect(eq(1,1)).to.be.true;
		expect(eq(1,12)).to.be.false;

		expect(eq('1',1)).to.be.true;
		expect(eq('1','1')).to.be.true;
		expect(eq('1',' 1')).to.be.false;

		expect(eq(true, true)).to.be.true;
		expect(eq(true,'true')).to.be.true;

		expect(eq([],[])).to.be.true;
		expect(eq([1,2,3],[1,2,3])).to.be.true;
		expect(eq([1,2,3,4],[1,2,3])).to.be.false;
	});
});
