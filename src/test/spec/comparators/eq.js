describe('Comparators: eq', function () {
	it('should compare correct', function () {
		var eq = MetaApp.Comparators.eq;

		expect(eq(1,1)).toBeTruthy();
		expect(eq(1,12)).toBeFalsy();

		expect(eq('1',1)).toBeTruthy();
		expect(eq('1','1')).toBeTruthy();
		expect(eq('1',' 1')).toBeFalsy();

		expect(eq(true, true)).toBeTruthy();
		expect(eq(true,'true')).toBeTruthy();

		expect(eq([],[])).toBeTruthy();
		expect(eq([1,2,3],[1,2,3])).toBeTruthy();
		expect(eq([1,2,3,4],[1,2,3])).toBeFalsy();
	});
});