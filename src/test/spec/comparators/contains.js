describe('Comparators: contains', function () {
	it('should compare correct', function () {
		var contains = MetaApp.Comparators.contains;

		expect(contains('a', 'abc')).toBeTruthy();
		expect(contains('abc', 'a')).toBeTruthy();

		expect(contains(1, [0,1,2])).toBeTruthy();
		expect(contains([0,1,2], 1)).toBeTruthy();

		expect(contains([0,1,2], 3)).toBeFalsy();
		expect(contains('abc', 'd')).toBeFalsy();
	});
});