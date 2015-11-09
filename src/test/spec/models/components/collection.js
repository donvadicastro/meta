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
});