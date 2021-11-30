// import {DataBase} from "../../src/models/components/base/data";

// describe('Validators: Custom', function () {
// 	it('should support applying custom validator', function () {
// 		MetaApp.Validators.CustomValidator = function(element) {
// 			this.element = element;
// 		};
// 		MetaApp.Validators.CustomValidator.prototype.validate = function() {
// 			return {
// 				isValid: this.element.getValue() === 'a',
// 				message: 'custom message'
// 			};
// 		};
//
// 		var element = new DataBase({name: 'testDataComponent', binding: 'binding', validation: {custom: true}});
// 		expect(element.validate().isValid).to.be.false;
//
// 		element.setValue('a');
// 		expect(element.validate().isValid).to.be.true;
// 		expect('custom message').to.equal(element.validate().message);
//
// 		element.setValue('b');
// 		expect(element.validate().isValid).to.be.false;
// 	});
// });
