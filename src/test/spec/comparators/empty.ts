/// <reference path="../../../../typings/globals/jasmine/index.d.ts" />
import {empty} from '../../../app/comparators/empty';

describe('Comparators: empty', function () {
	it('should compare correct', function () {
		expect(empty()).toBeTruthy();
		expect(empty('')).toBeTruthy();
		expect(empty(null)).toBeTruthy();
		expect(empty(undefined)).toBeTruthy();
		expect(empty([])).toBeTruthy();
		expect(empty({})).toBeTruthy();

		expect(empty(0)).toBeFalsy();
		expect(empty(1)).toBeFalsy();
		expect(empty('a')).toBeFalsy();
		expect(empty({a:1})).toBeFalsy();
		expect(empty([12])).toBeFalsy();
		expect(empty(false)).toBeFalsy();
	});
});