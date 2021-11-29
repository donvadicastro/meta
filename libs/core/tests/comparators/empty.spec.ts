import {empty} from '../../src/comparators';
import {expect} from "chai";

describe('Comparators: empty', function () {
	it('should compare correct', function () {
		expect(empty()).to.be.true;
		expect(empty('')).to.be.true;
		expect(empty(null)).to.be.true;
		expect(empty(undefined)).to.be.true;
		expect(empty([])).to.be.true;
		expect(empty({})).to.be.true;

		expect(empty(0)).to.be.false;
		expect(empty(1)).to.be.false;
		expect(empty('a')).to.be.false;
		expect(empty({a:1})).to.be.false;
		expect(empty([12])).to.be.false;
		expect(empty(false)).to.be.false;
	});
});
