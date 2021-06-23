describe('Managers: DynamicManager', function () {
	it('should set dynamic properties', function () {
		var element = new MetaApp.Models.Components.Form({name: 'testContainerComponent', items: [
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

		expect('old label').toBe(element.items[0].getPropertyValue('ui.label'));

		element.eventManager.trigger('data:*', 'b2', 'text-to-fire');
		element.eventManager.trigger('data:b2', 'text-to-fire');
		expect('new label').toBe(element.items[0].getPropertyValue('ui.label'));

		element.eventManager.trigger('data:*', 'b2', 'not-text-to-fire');
		element.eventManager.trigger('data:b2', 'not-text-to-fire');
		expect('old label').toBe(element.items[0].getPropertyValue('ui.label'));
	});

	it('should set dynamic properties with negation', function () {
		var element = new MetaApp.Models.Components.Form({name: 'testContainerComponent', items: [
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

		expect('old label').toBe(element.items[0].getPropertyValue('ui.label'));

		element.eventManager.trigger('data:b2', 'not-text-to-fire');
		expect('new label').toBe(element.items[0].getPropertyValue('ui.label'));
	});

	it('should support multi-when with OR comparison', function () {
		var element = new MetaApp.Models.Components.Form({name: 'testContainerComponent', items: [
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

		expect('old label').toBe(element.items[0].getPropertyValue('ui.label'));

		element.eventManager.trigger('data:*', 'b2', 'text-to-fire');
		element.eventManager.trigger('data:b2', 'text-to-fire');
		expect('old label').toBe(element.items[0].getPropertyValue('ui.label'));

		element.eventManager.trigger('data:*', 'b2', 'text-to-fire-1');
		element.eventManager.trigger('data:b2', 'text-to-fire-1');
		expect('new label').toBe(element.items[0].getPropertyValue('ui.label'));

		element.eventManager.trigger('data:*', 'b2', 'text-to-fire');
		element.eventManager.trigger('data:b2', 'text-to-fire');
		expect('old label').toBe(element.items[0].getPropertyValue('ui.label'));

		element.eventManager.trigger('data:*', 'b2', 'text-to-fire-2');
		element.eventManager.trigger('data:b2', 'text-to-fire-2');
		expect('new label').toBe(element.items[0].getPropertyValue('ui.label'));
	});

	it('should support multi-when with AND comparison', function () {
		var element = new MetaApp.Models.Components.Form({name: 'testContainerComponent', items: [
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

		expect('old label').toBe(element.items[0].getPropertyValue('ui.label'));

		element.eventManager.trigger('data:*', 'b1', 'text-to-fire-1');
		element.eventManager.trigger('data:b1', 'text-to-fire-1');
		expect('old label').toBe(element.items[0].getPropertyValue('ui.label'));

		element.eventManager.trigger('data:*', 'b2', 'text-to-fire-2');
		element.eventManager.trigger('data:b2', 'text-to-fire-2');
		expect('new label').toBe(element.items[0].getPropertyValue('ui.label'));

		element.eventManager.trigger('data:*', 'b1', 'text-to-fire');
		element.eventManager.trigger('data:b1', 'text-to-fire');
		expect('old label').toBe(element.items[0].getPropertyValue('ui.label'));

		element.eventManager.trigger('data:*', 'b2', 'text-to-fire');
		element.eventManager.trigger('data:b2', 'text-to-fire');
		expect('old label').toBe(element.items[0].getPropertyValue('ui.label'));
	});

	it('should support dynamic "when" value', function () {
		var element = new MetaApp.Models.Components.Form({name: 'testContainerComponent', items: [
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

		expect('old label').toBe(element.items[0].getPropertyValue('ui.label'));

		element.eventManager.trigger('data:*', 'b2', 'text-to-fire');
		element.eventManager.trigger('data:b2', 'text-to-fire');
		expect('old label').toBe(element.items[0].getPropertyValue('ui.label'));

		element.eventManager.trigger('data:*', 'b1', 'text-to-fire');
		element.eventManager.trigger('data:b1', 'text-to-fire');
		expect('new label').toBe(element.items[0].getPropertyValue('ui.label'));

		element.eventManager.trigger('data:*', 'b2', 'text-to-fire-1');
		element.eventManager.trigger('data:b2', 'text-to-fire-1');
		expect('old label').toBe(element.items[0].getPropertyValue('ui.label'));
	});
});
