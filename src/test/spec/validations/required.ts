import {DataBase} from "../../../app/models/components/base/data";
import {ResourceManager} from "../../../app/managers/resourceManager";

describe('Validators: Required', function () {
	it('should support required validation', function () {
		var element = new DataBase({name: 'testDataComponent', binding: 'binding', validation: {required: true}}),
			valResult = element.validate();

		expect(valResult.isValid).toBeFalsy();
		expect(valResult.message).toBe(ResourceManager.get('validators.requiredValidator.message'));

		element.setValue('a');
		valResult = element.validate();

		expect(valResult.isValid).toBeTruthy();
	});
});