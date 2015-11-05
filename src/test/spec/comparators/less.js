describe('Comparators: less', function () {
	it('should compare correct', function () {
		var less = MetaApp.Comparators.less;

		expect(less(10,11)).toBeTruthy();
		expect(less(11,11)).toBeFalsy();
		expect(less(11,10)).toBeFalsy();

		expect(less('a', 'b')).toBeTruthy();
		expect(less('A', 'a')).toBeTruthy();
		expect(less('b', 'a')).toBeFalsy();
	});
});