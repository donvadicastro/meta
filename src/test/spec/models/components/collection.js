describe('Models: Collection', function () {
    it('should create collection component correct', function () {
        var element = new MetaApp.Models.Components.CollectionBase({name: 'testCollectionComponent', binding: 'binding'});

        expect('testCollectionComponent').toBe(element.name);
        expect('binding').toBe(element.binding);

        expect(element.setValue).not.toBeUndefined();
        expect(element.getValue).not.toBeUndefined();
    });

    it('should select correct initializer', function () {
        var element = new MetaApp.Models.Components.Form({name: 'testFormComponent', items: [
            {name: 'child', binding: 'b', type: 'list'}
        ]});

        expect(element.items[0] instanceof MetaApp.Models.Components.CollectionBase).toBeTruthy();
    });

    it('should support static filtering', function () {
        var element = new MetaApp.Models.Components.CollectionBase({name: 'testCollectionComponent', binding: 'binding', filters: [{by: 'name', comparator: 'eq', val: 'b'}]});

        element.setValue([{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]);
        expect(element.getValue()).toEqualData([{id:2, name: 'b'}]);
    });

    it('should support dynamic filtering', function () {
        var form = new MetaApp.Models.Components.Form({name: 'testFormComponent', items: [
            {name: 'child1', binding: 'b1', type: 'list', filters: [{by: 'name', comparator: 'eq', val: '@b3'}]},
            {name: 'child2', binding: 'b1', type: 'list', filters: [{by: 'name', comparator: '!eq', val: '@b3'}]},
            {name: 'child3', binding: 'b3'}
        ]});

        form.data.b1 = [{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}];
        form.eventManager.trigger('data:b1', form.data.b1);
        expect(form.items[0].getValue()).toEqualData([]);
        expect(form.items[1].getValue()).toEqualData([{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]);

        form.items[2].setValue('c');
        expect(form.items[0].getValue()).toEqualData([{id:3, name: 'c'}]);
        expect(form.items[1].getValue()).toEqualData([{id:1, name: 'a'},{id:2, name: 'b'}]);

        expect(form.data.b1).toEqualData([{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]);
    });
});