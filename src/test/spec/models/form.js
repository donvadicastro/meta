beforeEach(function() {
    this.addMatchers({
        toEqualData: function(expected) {
            return JSON.stringify(this.actual) === JSON.stringify(expected);
        }
    });
});

describe('Models: Form', function () {
    it('should create _form component correct', function () {
        var element = new MetaApp.Models.Components.Form({name: 'testContainerComponent', items: [{name: 'child1', binding: 'b1'}, {name: 'child2', binding: 'b2'}]});

        expect('testContainerComponent').toBe(element.name);
        expect(2).toBe(element.items.length);

        expect('child1').toBe(element.items[0].name);
        expect('child2').toBe(element.items[1].name);
    });

    it('should save _form reference child level', function () {
        var element = new MetaApp.Models.Components.Form({name: 'testContainerComponent', items: [{name: 'child1', binding: 'b1'}, {name: 'child2', binding: 'b2'}]});
        expect(element).toBe(element.items[0]._form);
    });

    it('should create data model correct', function () {
        var element = new MetaApp.Models.Components.Form({name: 'testContainerComponent'});

        element.eventManager.trigger('data:*', 'prop1.prop2.prop3', 'aa');
        expect({prop1: {prop2: {prop3: 'aa'}}}).toEqualData(element.data);

        element.data = {};
        element.eventManager.trigger('data:*', 'prop1', 'aa');
        expect({prop1: 'aa'}).toEqualData(element.data);

        element.data = {};
        element.eventManager.trigger('data:*', 'prop1', {id:1, name: 'aa'});
        expect({prop1: {id:1, name: 'aa'}}).toEqualData(element.data);

        element.data = {};
        element.eventManager.trigger('data:*', 'prop1', 'aa');
        element.eventManager.trigger('data:*', 'prop2', 'bb');
        expect({prop1: 'aa', prop2: 'bb'}).toEqualData(element.data);

        element.data = {};
        element.eventManager.trigger('data:*', 'prop1.prop2', 'aa');
        element.eventManager.trigger('data:*', 'prop1.prop3', 'bb');
        expect({prop1: {prop2: 'aa', prop3: 'bb'}}).toEqualData(element.data);

        element.data = {};
        element.eventManager.trigger('data:*', 'prop1.prop3', 'aa');
        element.eventManager.trigger('data:*', 'prop2.prop4', 'bb');
        expect({prop1: {prop3: 'aa'}, prop2: {prop4: 'bb'}}).toEqualData(element.data);
    });
});