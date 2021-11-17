import {DataBase} from "../../../app/models/components/base/data";
import {ResourceManager} from "../../../app/managers/resourceManager";
import {expect} from "chai";

describe('Validators: Max', function () {
	it('should support max validation for string type', function () {
		let element = new DataBase({name: 'testDataComponent', _binding: 'binding', validation: {max: 5}}),
			valResult = element.validate();

		expect(valResult.isValid).to.be.true;

		element.setValue('abcdef');
		valResult = element.validate();

		expect(valResult.isValid).to.be.false;
		expect(valResult.message).to.equal(ResourceManager.get('validators.maxValidator.message.string'));

		element.setValue('abcde');
		valResult = element.validate();
		expect(valResult.isValid).to.be.true;
	});

	it('should support max validation for number type', function () {
		var element = new DataBase({name: 'testDataComponent', _binding: 'binding', type: 'string', validation: {max: 5}}),
			valResult = element.validate();

		expect(valResult.isValid).to.be.true;

		element.setValue(6);
		valResult = element.validate();

		expect(valResult.isValid).to.be.false;
		expect(valResult.message).to.equal(ResourceManager.get('validators.maxValidator.message.number'));

		element.setValue(5);
		valResult = element.validate();
		expect(valResult.isValid).to.be.true;
	});

	//TODO: add date max validator
});
