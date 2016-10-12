/// <reference path="../../../../typings/globals/jasmine/index.d.ts" />
import less from '../../../app/comparators/less';

describe('Comparators: less', function () {
	it('should compare correct', function () {
		expect(less(10,11)).toBeTruthy();
		expect(less(11,11)).toBeFalsy();
		expect(less(11,10)).toBeFalsy();

		expect(less('a', 'b')).toBeTruthy();
		expect(less('A', 'a')).toBeTruthy();
		expect(less('b', 'a')).toBeFalsy();
	});
});