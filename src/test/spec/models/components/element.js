describe('Models: Element', function () {
    it('should create base component correct', function () {
        var element = new MetaApp.Models.Components.ElementBase({name: 'testComponent'});
        expect('testComponent').toBe(element.name);
    });
});