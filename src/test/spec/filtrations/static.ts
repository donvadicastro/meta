import {Form} from "../../../app/models/components/form";

describe('Filtration: Static', function () {
	it('should support static string local filter', function () {
		var form = new Form({name: 'testFormComponent', items: [
			{name: 'child', binding: 'b1', dictionary: 'dic1', filters: [{by: 'name', comparator: 'eq', val: 'b'}]}
		], dictionaries: {
			dic1: [{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]
		}});

		expect(form.items[0].getList()).toEqualData([{id:2, name: 'b'}]);
	});
});