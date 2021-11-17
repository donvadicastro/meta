import {DictionaryBase} from "../../../../app/models/components/base/dictionary";
import {Form} from "../../../../app/models/components/form";
import {expect} from "chai";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import sinon, {SinonSpy} from "sinon";

describe('Models: Dictionary',  () => {
	let mock: MockAdapter;
	let axiosSpy: SinonSpy;

	before(() => {
		mock = new MockAdapter(axios);
		axiosSpy = sinon.spy(axios, 'get');
	});

	after(() => {
		mock.reset();
		axiosSpy.restore();
	});

	it('should support reading dictionary', () => {
		const element = new DictionaryBase({name: 'testDictionaryComponent', _binding: 'binding', dictionary: 'dictionary'});
		expect(element.getList).to.exist;
	});

	it('should read local dictionary', async () => {
		const element = new Form({name: 'testFormComponent', items: [
			{name: 'child1', _binding: 'b1', dictionary: 'd1'}
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

		const list = await element.items[0].getList();
		expect(list.length).to.equal(5);
		expect(list[0].id).to.equal(1);
	});

	it('should read remote dictionary', async () => {
		mock.onGet('d1').reply(200, [
			{id: 1, name: 'a'},
			{id: 2, name: 'b'},
			{id: 3, name: 'c'},
			{id: 4, name: 'd'},
			{id: 5, name: 'e'}
		]);

		const element = new Form({name: 'testFormComponent', items: [
			{name: 'child1', _binding: 'b1', dictionary: 'd1'}
		]});

		element.initialize();

		const list = await element.items[0].getList();
		expect(axiosSpy.calledWith('d1')).to.be.true;
		expect(list.length).to.equal(5);
		expect(list[0]).to.deep.equal({id: 1, name: 'a'});
	});

	it('should read remote string-list dictionary', async () => {
		mock.onGet('d2').reply(200, ['a', 'b', 'c', 'd', 'e']);

		const element = new Form({name: 'testFormComponent', items: [
				{name: 'child2', _binding: 'b2', dictionary: 'd2'}
			]});

		element.initialize();

		const list = await element.items[0].getList();
		expect(axiosSpy.calledWith('d2')).to.be.true;
		expect(list.length).to.equal(5);
		expect(list[0]).to.deep.equal({key: 'a', name: 'a'});
	});
});
