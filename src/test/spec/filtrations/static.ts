/// <reference path="../../../../typings/globals/jasmine/index.d.ts" />

import {Form} from "../../../app/models/components/form";
import {IMetaDictionaryComponent} from "../../../app/contracts/IMetaDictionaryComponent";
import {DictionaryBase} from "../../../app/models/components/base/dictionary";
import toEqualData from "../../matchers/toEqualData";

describe('Filtration: Static', function () {
	beforeEach(() => {
		jasmine.addMatchers({toEqualData: toEqualData});
	});

	it('should support static string local filter', function () {
		var item1: IMetaDictionaryComponent = {name: 'child', binding: 'b1', dictionary: 'dic1', filters: [{by: 'name', comparator: 'eq', val: 'b'}]};

		var form = new Form({name: 'testFormComponent', items: [item1], dictionaries: {
			dic1: [{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]
		}}, {});

		form.initialize();
		expect((<DictionaryBase>form.items[0]).getList()).toEqualData([{id:2, name: 'b'}]);
	});
});