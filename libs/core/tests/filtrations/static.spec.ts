import {Form} from "../../src/models/components/form";
import {IMetaDictionaryComponent} from "../../src/contracts/IMetaDictionaryComponent";
import {DictionaryBase} from "../../src/models/components/base/dictionary";
import {expect} from "chai";

describe('Filtration: Static', function () {
	it('should support static string local filter', async () => {
		var item1: IMetaDictionaryComponent = {name: 'child', binding: 'b1', dictionary: 'dic1', filters: [{by: 'name', comparator: 'eq', val: 'b'}]};

		var form = new Form({name: 'testFormComponent', items: [item1], dictionaries: {
			dic1: [{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]
		}}, {});

		form.initialize();
		expect(await (<DictionaryBase>form.items[0]).getList()).to.deep.equal([{id:2, name: 'b'}]);
	});
});
