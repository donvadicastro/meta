describe('Validators: Required', function () {
	it('should support required validation', function () {
		var element = new MetaApp.Models.Components.DataBase({name: 'testDataComponent', binding: 'binding', validation: {required: true}}),
			valResult = element.validate();

		expect(valResult.isValid).toBeFalsy();
		expect(valResult.message).toBe(MetaApp.Managers.ResourceManager.get('validators.requiredValidator.message'));

		element.setValue('a');
		valResult = element.validate();

		expect(valResult.isValid).toBeTruthy();
	});
});