import {toUpperCaseFirstLetter} from '../../../app/utils/string';

describe('Utils: String', function () {
	it('check toUpperCaseFirstLetter', function () {
		expect('Abcd').toBe(toUpperCaseFirstLetter('abcd'));
		expect('Abcd').toBe(toUpperCaseFirstLetter('Abcd'));
		expect('Abcd').toBe(toUpperCaseFirstLetter('ABCD'));
		expect('Abcd').toBe(toUpperCaseFirstLetter('aBCD'));
	});
});