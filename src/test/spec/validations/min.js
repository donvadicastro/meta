describe('Validators: Min', function () {
	it('should support min validation for string type', function () {
		var element = new MetaApp.Models.Components.DataBase({name: 'testDataComponent', binding: 'binding', validation: {min: 5}}),
			valResult = element.validate();

		expect(valResult.isValid).toBeTruthy();

		element.setValue('a');
		valResult = element.validate();

		expect(valResult.isValid).toBeFalsy();
		expect(valResult.message).toBe(MetaApp.Managers.ResourceManager.get('validators.minValidator.message.string'));

		element.setValue('abcde');
		valResult = element.validate();
		expect(valResult.isValid).toBeTruthy();
	});

	it('should support min validation for number type', function () {
		var element = new MetaApp.Models.Components.DataBase({name: 'testDataComponent', binding: 'binding', type: 'number', validation: {min: 5}}),
			valResult = element.validate();

		expect(valResult.isValid).toBeTruthy();

		element.setValue(4);
		valResult = element.validate();

		expect(valResult.isValid).toBeFalsy();
		expect(valResult.message).toBe(MetaApp.Managers.ResourceManager.get('validators.minValidator.message.number'));

		element.setValue(5);
		valResult = element.validate();
		expect(valResult.isValid).toBeTruthy();
	});

	//TODO: add date min validator
});