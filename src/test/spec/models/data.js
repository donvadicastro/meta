describe('Models: Data', function () {
    it('should create data component correct', function () {
        var element = new MetaApp.Models.Components.DataBase({name: 'testDataComponent', binding: 'binding'});

        expect('testDataComponent').toBe(element.name);
        expect('binding').toBe(element.binding);

        expect(element.setValue).not.toBeUndefined();
        expect(element.getValue).not.toBeUndefined();
    });

    it('should support simple data binding', function () {
        var form = new MetaApp.Models.Components.Form({name: 'dataForm', items: [{name: 'e1', binding: 'b1'}]});
        expect(form.data.b1).toBeUndefined();

        form.items[0].setValue('a');
        expect('a').toBe(form.data.b1);
        expect('a').toBe(form.items[0].getValue());
    });
});