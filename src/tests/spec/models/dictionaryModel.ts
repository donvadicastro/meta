import {Form} from "../../../app/models/components/form";
import {DictionaryModel} from "../../../app/models/dictionaryModel";
import {expect} from "chai";

describe('Models: DictionaryModel', function () {
	it('should support getting full list', async () => {
		const form = new Form({name: 'testFormComponent', items: [
			{name: 'child', _binding: 'b1', dictionary: 'dic1'}
		], dictionaries: {
			dic1: [{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]
		}});

		form.initialize();

		const dic = new DictionaryModel(form.items[0]);
		expect(await dic.getList()).to.deep.equal([{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]);
	});

	it('should support getting filtered list', async () => {
		const form = new Form({name: 'testFormComponent', items: [
				{name: 'child', _binding: 'b1', dictionary: 'dic1', filters: [{by: 'name', comparator: 'eq', val: 'b'}]}
			], dictionaries: {
				dic1: [{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]
			}});

		form.initialize();

		const dic = new DictionaryModel(form.items[0]);
		expect(await dic.getList()).to.deep.equal([{id:2, name: 'b'}]);
	});

	it('should support comparators negation', async () => {
		const form = new Form({name: 'testFormComponent', items: [
				{name: 'child', _binding: 'b1', dictionary: 'dic1', filters: [{by: 'name', comparator: '!eq', val: 'b'}]}
			], dictionaries: {
				dic1: [{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]
			}});

		form.initialize();

		const dic = new DictionaryModel(form.items[0]);
		expect(await dic.getList()).to.deep.equal([{id:1, name: 'a'},{id:3, name: 'c'}]);
	});

	it('should support setting array of filters', async () => {
		const form = new Form({name: 'testFormComponent', items: [
				{name: 'child', _binding: 'b1', dictionary: 'dic1', filters: [{by: 'name', comparator: 'eq', val: 'a'}, {by: 'code', comparator: 'eq', val: 'c'}]}
			], dictionaries: {
				dic1: [{id:1, name: 'a', code: 'a'},{id:2, name: 'a', code: 'b'},{id:3, name: 'a', code: 'c'}]
			}});

		form.initialize();

		const dic = new DictionaryModel(form.items[0]);
		expect(await dic.getList()).to.deep.equal([{id:3, name: 'a', code: 'c'}]);
	});

	it('should support complex path', async () => {
		const form = new Form({name: 'testFormComponent', items: [
				{name: 'child', _binding: 'b1', dictionary: 'dic1', filters: [{by: 'country.city.name', comparator: 'eq', val: 'b'}]}
			], dictionaries: {
				dic1: [{id:1, name: 'a', country: {city: {name: 'a'}}},{id:2, name: 'b', country: {city: {name: 'b'}}},{id:3, name: 'c', country: {city: {name: 'c'}}}]
			}});

		form.initialize();

		const dic = new DictionaryModel(form.items[0]);
		expect(await dic.getList()).to.deep.equal([{id:2, name: 'b', country: {city: {name: 'b'}}}]);
	});
});
