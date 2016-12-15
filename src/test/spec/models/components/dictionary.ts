import {DictionaryBase} from "../../../../app/models/components/base/dictionary";
import {Form} from "../../../../app/models/components/form";

describe('Models: Dictionary', function () {
	it('should support reading dictionary', function () {
		var element = new DictionaryBase({name: 'testDictionaryComponent', binding: 'binding', dictionary: 'dictionary'});
		expect(element.getList).toBeDefined();
	});

	it('should read local dictionary', function () {
		var element = new Form({name: 'testFormComponent', items: [
			{name: 'child1', binding: 'b1', dictionary: 'd1'}
		], dictionaries: {
			d1: [
				{id: 1, name: 'a'},
				{id: 2, name: 'b'},
				{id: 3, name: 'c'},
				{id: 4, name: 'd'},
				{id: 5, name: 'e'}
			]
		}});

		element.initialize();

		expect(element.items[0].getList().length).toBe(5);
		expect(element.items[0].getList()[0].id).toBe(1);
	});
});