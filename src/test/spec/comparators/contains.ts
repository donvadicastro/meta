/// <reference path="../../../../typings/globals/jasmine/index.d.ts" />

import {contains} from '../../../app/comparators/contains';

describe('Comparators: contains', function () {
	it('should compare correct', function () {
		expect(contains('a', 'abc')).toBeTruthy();
		expect(contains('abc', 'a')).toBeTruthy();

		expect(contains(1, [0,1,2])).toBeTruthy();
		expect(contains([0,1,2], 1)).toBeTruthy();

		expect(contains([0,1,2], 3)).toBeFalsy();
		expect(contains('abc', 'd')).toBeFalsy();
	});
});