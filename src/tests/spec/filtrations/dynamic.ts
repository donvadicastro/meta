import {Form} from "../../../app/models/components/form";
import {IMetaDictionaryComponent} from "../../../app/contracts/IMetaDictionaryComponent";
import {IMetaDataComponent} from "../../../app/contracts/IMetaDataComponent";
import {DictionaryBase} from "../../../app/models/components/base/dictionary";
import {DataBase} from "../../../app/models/components/base/data";
import {expect} from "chai";

describe('Filtration: Dynamic', () => {
	it('should support dynamic string local filter', async () => {
		const item1:IMetaDictionaryComponent = {name: 'child1', binding: 'b1', dictionary: 'dic1', filters: [{by: 'name', comparator: 'eq', val: '@b2'}]},
			item2: IMetaDataComponent = {name: 'child1', binding: 'b2'};

		const form = new Form({ name: 'testFormComponent', items: [item1, item2], dictionaries: {
			dic1: [{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]
		}}, {});

		form.initialize();
		expect((<DictionaryBase>form.items[0]).getList()).is.empty;

		(<DataBase>form.items[1]).setValue('b');
		expect(await (<DictionaryBase>form.items[0]).getList()).to.deep.equal([{id:2, name: 'b'}]);
	});
});
