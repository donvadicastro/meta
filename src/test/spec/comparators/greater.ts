/// <reference path="../../../../typings/globals/jasmine/index.d.ts" />
import {greater} from '../../../app/comparators/greater';

describe('Comparators: greater', function () {
	it('should compare correct', function () {
		expect(greater(10,11)).toBeFalsy();
		expect(greater(11,11)).toBeFalsy();
		expect(greater(11,10)).toBeTruthy();

		expect(greater('a', 'b')).toBeFalsy();
		expect(greater('A', 'a')).toBeFalsy();
		expect(greater('b', 'a')).toBeTruthy();
	});
});