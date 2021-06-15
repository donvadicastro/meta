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

        expect(element.items[0] instanceof MetaApp.Models.Components.CollectionBase).to.be.true;
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

    it('should support adding new item', function () {
        var element = new MetaApp.Models.Components.CollectionBase({name: 'testCollectionComponent', binding: 'binding', items: [
            {name: 'child1', binding: 'b1'},
            {name: 'child2', binding: 'b2'}
        ] });

        element.getContainer().items[0].setValue('a');
        element.getContainer().items[1].setValue('b');

        element.addItem(element.getSelected());
        expect(JSON.stringify([{b1: 'a', b2: 'b'}])).toBe(JSON.stringify(element.getValue()));
    });

    it('should support editing existing item', function () {
        var element = new MetaApp.Models.Components.CollectionBase({name: 'testCollectionComponent', binding: 'binding', items: [
            {name: 'child1', binding: 'b1'},
            {name: 'child2', binding: 'b2'}
        ] });

        element.setValue([{id: -100, b1: 'a', b2: 'b'}]);
        element.setSelected(-100);

        element.getContainer().items[0].setValue('aa');
        element.getContainer().items[1].setValue('bb');

        element.editItem(element.getSelected());
        expect(JSON.stringify([{id: -100, b1: 'aa', b2: 'bb'}])).toBe(JSON.stringify(element.getValue()));
    });


    it('should support deleting existing item', function () {
        var element = new MetaApp.Models.Components.CollectionBase({name: 'testCollectionComponent', binding: 'binding', items: [
            {name: 'child1', binding: 'b1'},
            {name: 'child2', binding: 'b2'}
        ] });

        element.setValue([{id: -100, b1: 'a', b2: 'b'}]);

        element.removeItem(-101);
        expect(JSON.stringify([{id: -100, b1: 'a', b2: 'b'}])).toBe(JSON.stringify(element.getValue()));

        element.removeItem(-100);
        expect(JSON.stringify([])).toBe(JSON.stringify(element.getValue()));
    });
});
