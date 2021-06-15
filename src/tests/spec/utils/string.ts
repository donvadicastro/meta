import {toUpperCaseFirstLetter} from '../../../app/utils/string';
import {expect} from "chai";

describe('Utils: String', function () {
	it('check toUpperCaseFirstLetter', function () {
		expect('Abcd').to.equal(toUpperCaseFirstLetter('abcd'));
		expect('Abcd').to.equal(toUpperCaseFirstLetter('Abcd'));
		expect('Abcd').to.equal(toUpperCaseFirstLetter('ABCD'));
		expect('Abcd').to.equal(toUpperCaseFirstLetter('aBCD'));
	});
});
