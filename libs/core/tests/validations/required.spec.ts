import {DataBase} from "../../src/models/components/base/data";
import {ResourceManager} from "../../src/managers/resourceManager";

describe('Validators: Required', function () {
	it('should support required validation', function () {
		let element = new DataBase({name: 'testDataComponent', binding: 'binding', validation: {required: true}}),
			valResult = element.validate();

		expect(valResult.isValid).toBeFalsy();
		expect(valResult.message).toEqual(ResourceManager.get('validators.requiredValidator.message'));

		element.setValue('a');
		valResult = element.validate();

		expect(valResult.isValid).toBeTruthy();
	});
});
