import {Form} from "../../../app/models/components/form";

describe('Filtration: Dynamic', function () {
	it('should support dynamic string local filter', function () {
		var form = new Form({name: 'testFormComponent', items: [
			{name: 'child1', binding: 'b1', dictionary: 'dic1', filters: [{by: 'name', comparator: 'eq', val: '@b2'}]},
			{name: 'child1', binding: 'b2'}
		], dictionaries: {
			dic1: [{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]
		}});

		expect(form.items[0].getList()).toEqualData([]);

		form.items[1].setValue('b');
		expect(form.items[0].getList()).toEqualData([{id:2, name: 'b'}]);
	});
});