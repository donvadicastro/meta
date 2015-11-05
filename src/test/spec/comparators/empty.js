describe('Comparators: empty', function () {
	it('should compare correct', function () {
		var empty = MetaApp.Comparators.empty;

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