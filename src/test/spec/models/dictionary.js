describe('Models: Dictionary', function () {
	it('should support reading dictionary', function () {
		var element = new MetaApp.Models.Components.DictionaryBase({name: 'testDictionaryComponent', binding: 'binding', dictionary: 'dictionary'});
		expect(element.getList).toBeDefined();
	});

	it('should read local dictionary', function () {
		var element = new MetaApp.Models.Components.Form({name: 'testFormComponent', items: [
			{name: 'child1', binding: 'b1', dictionary: 'd1'}
		], dictionaries: {
			d1: [
				{id: 1, name: 'a'},
				{id: 2, name: 'b'},
				{id: 3, name: 'c'},
				{id: 4, name: 'd'},
				{id: 5, name: 'e'}
			]
		}});

		expect(element.items[0].getList().length).toBe(5);
		expect(element.items[0].getList()[0].id).toBe(1);
	});
});