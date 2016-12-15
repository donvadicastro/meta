/// <reference path="../../../../typings/globals/jasmine/index.d.ts" />

import {Form} from "../../../app/models/components/form";
import {IMetaDictionaryComponent} from "../../../app/contracts/IMetaDictionaryComponent";
import {IMetaDataComponent} from "../../../app/contracts/IMetaDataComponent";
import {DictionaryBase} from "../../../app/models/components/base/dictionary";
import {DataBase} from "../../../app/models/components/base/data";
import toEqualData from "../../matchers/toEqualData";

describe('Filtration: Dynamic', () => {
	beforeEach(() => {
		jasmine.addMatchers({toEqualData: toEqualData});
	});

	it('should support dynamic string local filter', () => {
		var item1:IMetaDictionaryComponent = {name: 'child1', binding: 'b1', dictionary: 'dic1', filters: [{by: 'name', comparator: 'eq', val: '@b2'}]},
			item2: IMetaDataComponent = {name: 'child1', binding: 'b2'};

		var form = new Form({ name: 'testFormComponent', items: [item1, item2], dictionaries: {
			dic1: [{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]
		}}, {});

		form.initialize();
		expect((<DictionaryBase>form.items[0]).getList()).toEqualData([]);

		(<DataBase>form.items[1]).setValue('b');
		expect((<DictionaryBase>form.items[0]).getList()).toEqualData([{id:2, name: 'b'}]);
	});
});