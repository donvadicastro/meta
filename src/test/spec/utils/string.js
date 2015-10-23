describe('Utils: String', function () {
	it('check toUpperCaseFirstLetter', function () {
		expect('Abcd').toBe(MetaApp.Utils.String.toUpperCaseFirstLetter('abcd'));
		expect('Abcd').toBe(MetaApp.Utils.String.toUpperCaseFirstLetter('Abcd'));
		expect('Abcd').toBe(MetaApp.Utils.String.toUpperCaseFirstLetter('ABCD'));
		expect('Abcd').toBe(MetaApp.Utils.String.toUpperCaseFirstLetter('aBCD'));
	});
});