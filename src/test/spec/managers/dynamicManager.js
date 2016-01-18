describe('Managers: DynamicManager', function () {
	it('should set dynamic properties', function () {
		var element = new MetaApp.Models.Components.Form({name: 'testContainerComponent', items: [
			{ name: 'child1', binding: 'b1',
				ui: {
					label: 'old label'
				},
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

		element.eventManager.trigger('data:b2', 'text-to-fire');
		expect('new label').toBe(element.items[0].getPropertyValue('ui.label'));
	});
});