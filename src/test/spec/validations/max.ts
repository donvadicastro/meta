import {DataBase} from "../../../app/models/components/base/data";
import {ResourceManager} from "../../../app/managers/resourceManager";

describe('Validators: Max', function () {
	it('should support max validation for string type', function () {
		var element = new DataBase({name: 'testDataComponent', binding: 'binding', validation: {max: 5}}),
			valResult = element.validate();

		expect(valResult.isValid).toBeTruthy();

		element.setValue('abcdef');
		valResult = element.validate();

		expect(valResult.isValid).toBeFalsy();
		expect(valResult.message).toBe(ResourceManager.get('validators.maxValidator.message.string'));

		element.setValue('abcde');
		valResult = element.validate();
		expect(valResult.isValid).toBeTruthy();
	});

	it('should support max validation for number type', function () {
		var element = new DataBase({name: 'testDataComponent', binding: 'binding', type: 'number', validation: {max: 5}}),
			valResult = element.validate();

		expect(valResult.isValid).toBeTruthy();

		element.setValue(6);
		valResult = element.validate();

		expect(valResult.isValid).toBeFalsy();
		expect(valResult.message).toBe(ResourceManager.get('validators.maxValidator.message.number'));

		element.setValue(5);
		valResult = element.validate();
		expect(valResult.isValid).toBeTruthy();
	});

	//TODO: add date max validator
});