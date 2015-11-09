xdescribe('Models: Collection', function () {
    it('should create collection component correct', function () {
        var element = new MetaApp.Models.Components.CollectionBase({name: 'testCollectionComponent', binding: 'binding'});

        expect('testCollectionComponent').toBe(element.name);
        expect('binding').toBe(element.binding);

        expect(element.setValue).not.toBeUndefined();
        expect(element.getValue).not.toBeUndefined();
    });
});