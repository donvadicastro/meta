import {Form} from "../../../app/models/components/form";
import {DictionaryModel} from "../../../app/models/dictionaryModel";
import {expect} from "chai";

describe('Models: DictionaryModel', function () {
	it('should support getting full list', function () {
		var form = new Form({name: 'testFormComponent', items: [
			{name: 'child', binding: 'b1', dictionary: 'dic1'}
		], dictionaries: {
			dic1: [{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]
		}});

		form.initialize();

		var dic = new DictionaryModel(form.items[0]);
		expect(dic.getList()).to.deep.equal([{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]);
	});

	it('should support getting filtered list', function () {
		var form = new Form({name: 'testFormComponent', items: [
				{name: 'child', binding: 'b1', dictionary: 'dic1', filters: [{by: 'name', comparator: 'eq', val: 'b'}]}
			], dictionaries: {
				dic1: [{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]
			}});

		form.initialize();

		var dic = new DictionaryModel(form.items[0]);
		expect(dic.getList()).to.deep.equal([{id:2, name: 'b'}]);
	});

	it('should support comparators negation', function () {
		var form = new Form({name: 'testFormComponent', items: [
				{name: 'child', binding: 'b1', dictionary: 'dic1', filters: [{by: 'name', comparator: '!eq', val: 'b'}]}
			], dictionaries: {
				dic1: [{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]
			}});

		form.initialize();

		var dic = new DictionaryModel(form.items[0]);
		expect(dic.getList()).to.deep.equal([{id:1, name: 'a'},{id:3, name: 'c'}]);
	});

	it('should support setting array of filters', function () {
		var form = new Form({name: 'testFormComponent', items: [
				{name: 'child', binding: 'b1', dictionary: 'dic1', filters: [{by: 'name', comparator: 'eq', val: 'a'}, {by: 'code', comparator: 'eq', val: 'c'}]}
			], dictionaries: {
				dic1: [{id:1, name: 'a', code: 'a'},{id:2, name: 'a', code: 'b'},{id:3, name: 'a', code: 'c'}]
			}});

		form.initialize();

		var dic = new DictionaryModel(form.items[0]);
		expect(dic.getList()).to.deep.equal([{id:3, name: 'a', code: 'c'}]);
	});

	it('should support complex path', function () {
		var form = new Form({name: 'testFormComponent', items: [
				{name: 'child', binding: 'b1', dictionary: 'dic1', filters: [{by: 'country.city.name', comparator: 'eq', val: 'b'}]}
			], dictionaries: {
				dic1: [{id:1, name: 'a', country: {city: {name: 'a'}}},{id:2, name: 'b', country: {city: {name: 'b'}}},{id:3, name: 'c', country: {city: {name: 'c'}}}]
			}});

		form.initialize();

		var dic = new DictionaryModel(form.items[0]);
		expect(dic.getList()).to.deep.equal([{id:2, name: 'b', country: {city: {name: 'b'}}}]);
	});
});
