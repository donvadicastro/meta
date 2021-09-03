import {capitalize} from '../../../app/utils/string';
import {expect} from "chai";

describe('Utils: String', function () {
	it('check toUpperCaseFirstLetter', function () {
		expect('Abcd').to.equal(capitalize('abcd'));
		expect('Abcd').to.equal(capitalize('Abcd'));
		expect('Abcd').to.equal(capitalize('ABCD'));
		expect('Abcd').to.equal(capitalize('aBCD'));
		expect('Abcd').to.equal(capitalize('aBCD'));
	});
});
