import {DataBase} from "../../../app/models/components/base/data";
import {ResourceManager} from "../../../app/managers/resourceManager";
import {expect} from "chai";

describe('Validators: Required', function () {
	it('should support required validation', function () {
		let element = new DataBase({name: 'testDataComponent', binding: 'binding', validation: {required: true}}),
			valResult = element.validate();

		expect(valResult.isValid).to.be.false;
		expect(valResult.message).to.equal(ResourceManager.get('validators.requiredValidator.message'));

		element.setValue('a');
		valResult = element.validate();

		expect(valResult.isValid).to.be.true;
	});
});
