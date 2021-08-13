import {Form} from "../../../app/models/components/form";
import {expect} from "chai";
import * as Actions from '../../../app/actions';
import sinon from "sinon";

describe('Managers: DynamicManager', () => {
	it('should set dynamic properties', () => {
		const form = new Form({name: 'testContainerComponent', items: [
			{ name: 'child1', binding: 'b1',
				ui: { label: 'old label' },
				dynamic: {
					prop: 'ui.label',
					val: 'new label',
					when: [{
						binding: 'b2',
						fn: 'eq',
						val: 'text-to-fire'
					}]
				}}
		]});

		form.initialize();
		expect('old label').to.equal(form.items[0].getPropertyValue('ui.label'));

		form.eventManager.trigger('data:*', 'b2', 'text-to-fire');
		form.eventManager.trigger('data:b2', 'text-to-fire');
		expect('new label').to.equal(form.items[0].getPropertyValue('ui.label'));

		form.eventManager.trigger('data:*', 'b2', 'not-text-to-fire');
		form.eventManager.trigger('data:b2', 'not-text-to-fire');
		expect('old label').to.equal(form.items[0].getPropertyValue('ui.label'));
	});

	it('should set dynamic properties with negation', () => {
		const form = new Form({name: 'testContainerComponent', items: [
			{ name: 'child1', binding: 'b1',
				ui: { label: 'old label' },
				dynamic: {
					prop: 'ui.label',
					val: 'new label',
					when: [{
						binding: 'b2',
						fn: '!eq',
						val: 'text-to-fire'
					}]
				}}
		]});

		form.initialize();
		expect('old label').to.equal(form.items[0].getPropertyValue('ui.label'));

		form.eventManager.trigger('data:b2', 'not-text-to-fire');
		expect('new label').to.equal(form.items[0].getPropertyValue('ui.label'));
	});

	it('should support multi-when with OR comparison', () => {
		const form = new Form({name: 'testContainerComponent', items: [
			{ name: 'child1', binding: 'b1',
				ui: { label: 'old label' },
				dynamic: {
					prop: 'ui.label',
					val: 'new label',
					operator: 'or',
					when: [{
						binding: 'b2',
						fn: 'eq',
						val: 'text-to-fire-1'
					}, {
						binding: 'b2',
						fn: 'eq',
						val: 'text-to-fire-2'
					}]
				}}
		]});

		form.initialize();
		expect('old label').to.equal(form.items[0].getPropertyValue('ui.label'));

		form.eventManager.trigger('data:*', 'b2', 'text-to-fire');
		form.eventManager.trigger('data:b2', 'text-to-fire');
		expect('old label').to.equal(form.items[0].getPropertyValue('ui.label'));

		form.eventManager.trigger('data:*', 'b2', 'text-to-fire-1');
		form.eventManager.trigger('data:b2', 'text-to-fire-1');
		expect('new label').to.equal(form.items[0].getPropertyValue('ui.label'));

		form.eventManager.trigger('data:*', 'b2', 'text-to-fire');
		form.eventManager.trigger('data:b2', 'text-to-fire');
		expect('old label').to.equal(form.items[0].getPropertyValue('ui.label'));

		form.eventManager.trigger('data:*', 'b2', 'text-to-fire-2');
		form.eventManager.trigger('data:b2', 'text-to-fire-2');
		expect('new label').to.equal(form.items[0].getPropertyValue('ui.label'));
	});

	it('should support multi-when with AND comparison', () => {
		const form = new Form({name: 'testContainerComponent', items: [
			{ name: 'child1', binding: 'b1',
				ui: { label: 'old label' },
				dynamic: {
					prop: 'ui.label',
					val: 'new label',
					when: [{
						binding: 'b1',
						fn: 'eq',
						val: 'text-to-fire-1'
					}, {
						binding: 'b2',
						fn: 'eq',
						val: 'text-to-fire-2'
					}]
				}}
		]});

		form.initialize();
		expect('old label').to.equal(form.items[0].getPropertyValue('ui.label'));

		form.eventManager.trigger('data:*', 'b1', 'text-to-fire-1');
		form.eventManager.trigger('data:b1', 'text-to-fire-1');
		expect('old label').to.equal(form.items[0].getPropertyValue('ui.label'));

		form.eventManager.trigger('data:*', 'b2', 'text-to-fire-2');
		form.eventManager.trigger('data:b2', 'text-to-fire-2');
		expect('new label').to.equal(form.items[0].getPropertyValue('ui.label'));

		form.eventManager.trigger('data:*', 'b1', 'text-to-fire');
		form.eventManager.trigger('data:b1', 'text-to-fire');
		expect('old label').to.equal(form.items[0].getPropertyValue('ui.label'));

		form.eventManager.trigger('data:*', 'b2', 'text-to-fire');
		form.eventManager.trigger('data:b2', 'text-to-fire');
		expect('old label').to.equal(form.items[0].getPropertyValue('ui.label'));
	});

	it('should support dynamic "when" value', () => {
		const form = new Form({name: 'testContainerComponent', items: [
			{ name: 'child1', binding: 'b1',
				ui: { label: 'old label' },
				dynamic: {
					prop: 'ui.label',
					val: 'new label',
					when: [{
						binding: 'b2',
						fn: 'eq',
						val: '@b1'
					}]
				}}
		]});

		form.initialize();
		expect('old label').to.equal(form.items[0].getPropertyValue('ui.label'));

		form.eventManager.trigger('data:*', 'b2', 'text-to-fire');
		form.eventManager.trigger('data:b2', 'text-to-fire');
		expect('old label').to.equal(form.items[0].getPropertyValue('ui.label'));

		form.eventManager.trigger('data:*', 'b1', 'text-to-fire');
		form.eventManager.trigger('data:b1', 'text-to-fire');
		expect('new label').to.equal(form.items[0].getPropertyValue('ui.label'));

		form.eventManager.trigger('data:*', 'b2', 'text-to-fire-1');
		form.eventManager.trigger('data:b2', 'text-to-fire-1');
		expect('old label').to.equal(form.items[0].getPropertyValue('ui.label'));
	});

	it('should support dynamic "val" value', () => {
		const form = new Form({name: 'testContainerComponent', items: [{
			name: 'child1',
			binding: 'b1',
			ui: { label: 'old label' },
			dynamic: {
				prop: 'ui.label',
				val: '@b2',
				when: [{
					binding: 'b2',
					fn: 'eq',
					val: '@b1'
				}]
			}}
		]});

		form.initialize();
		expect('old label').to.equal(form.items[0].getPropertyValue('ui.label'));

		form.eventManager.trigger('data:*', 'b2', 'text-to-fire');
		form.eventManager.trigger('data:b2', 'text-to-fire');
		expect('old label').to.equal(form.items[0].getPropertyValue('ui.label'));

		form.eventManager.trigger('data:*', 'b1', 'text-to-fire');
		form.eventManager.trigger('data:b1', 'text-to-fire');
		expect('text-to-fire').to.equal(form.items[0].getPropertyValue('ui.label'));

		form.eventManager.trigger('data:*', 'b2', 'text-to-fire-1');
		form.eventManager.trigger('data:b2', 'text-to-fire-1');
		expect('old label').to.equal(form.items[0].getPropertyValue('ui.label'));
	});

	it('should support dynamic "val" value on change', () => {
		const form = new Form({name: 'testContainerComponent', items: [{
			name: 'child1',
			binding: 'b1',
			ui: { label: 'old label' },
			dynamic: {
				prop: 'ui.label',
				val: '@b2',
				when: [{
					binding: 'b2',
					fn: 'change'
				}]
			}}
		]});

		form.initialize();
		form.eventManager.trigger('data:*', 'b2', 'text-to-fire');
		form.eventManager.trigger('data:b2', 'text-to-fire');

		expect('text-to-fire').to.equal(form.items[0].getPropertyValue('ui.label'));
	});

	it('should support dynamic "val" value with transformation', () => {
		const form = new Form({name: 'testContainerComponent', items: [{
			name: 'child1',
			binding: 'b1',
			ui: { label: 'old label' },
			dynamic: {
				prop: 'ui.label',
				val: '@upperCase(b2)',
				when: [{
					binding: 'b2',
					fn: 'eq',
					val: '@b1'
				}]
			}}
		]});

		form.initialize();
		form.eventManager.trigger('data:*', 'b2', 'text-to-fire');
		form.eventManager.trigger('data:b2', 'text-to-fire');

		form.eventManager.trigger('data:*', 'b1', 'text-to-fire');
		form.eventManager.trigger('data:b1', 'text-to-fire');

		expect('TEXT-TO-FIRE').to.equal(form.items[0].getPropertyValue('ui.label'));
	});

	it('should support action triggering through dynamics', () => {
		const mockFn = sinon.mock(),
			form = new Form({name: 'testContainerComponent', items: [{
				name: 'action',
				action: {name: 'testAction'},
				dynamic: {
					prop: 'action.execute', val: true,
					when: [{ binding: 'b2', fn: 'eq', val: 'text-to-fire' }]
				}}
			]});

		form.initialize();
		Actions['testAction'] = mockFn;
		expect(mockFn.called).to.be.false;

		form.eventManager.trigger('data:*', 'b2', 'do-not-fire');
		form.eventManager.trigger('data:b2', 'do-not-fire');
		expect(mockFn.called).to.be.false;

		form.eventManager.trigger('data:*', 'b2', 'text-to-fire');
		form.eventManager.trigger('data:b2', 'text-to-fire');
		expect(mockFn.calledOnce).to.be.true;
	});

	it('should support action triggering on each data change through dynamics', () => {
		const mockFn = sinon.stub(),
			form = new Form({name: 'testContainerComponent', items: [{
				name: 'action',
				action: {name: 'testAction'},
				dynamic: {
					prop: 'action.execute', val: true,
					when: [{ binding: 'b2', fn: 'change' }]
				}}
			]});

		form.initialize();
		Actions['testAction'] = mockFn;
		expect(mockFn.called).to.be.false;

		form.eventManager.trigger('data:*', 'b2', 'fire1');
		form.eventManager.trigger('data:b2', 'fire1');
		expect(mockFn.calledOnce).to.be.true;

		form.eventManager.trigger('data:*', 'b2', 'fire2');
		form.eventManager.trigger('data:b2', 'fire2');
		expect(mockFn.calledTwice).to.be.true;

		form.eventManager.trigger('data:*', 'b2', 'fire3');
		form.eventManager.trigger('data:b2', 'fire3');
		expect(mockFn.calledThrice).to.be.true;
	});
});
