import {DataBase} from "../../../../app/models/components/base/data";
import {Form} from "../../../../app/models/components/form";

describe('Models: Data', function () {
    it('should create data component correct', function () {
        var element = new DataBase({name: 'testDataComponent', binding: 'binding'});

        expect('testDataComponent').toBe(element.name);
        expect('binding').toBe(element.binding);

        expect(element.setValue).not.toBeUndefined();
        expect(element.getValue).not.toBeUndefined();
    });

    it('should support simple data binding', function () {
        var form = new Form({name: 'dataForm', items: [{name: 'e1', binding: 'b1'}]});
        form.initialize();

        expect(form.data.b1).toBeUndefined();

        form.items[0].setValue('a');
        expect('a').toBe(form.data.b1);
        expect('a').toBe(form.items[0].getValue());
    });

    it('should support data convertions', function () {
        var form = new Form({name: 'dataForm', items: [
            {name: 'testDataComponent0', binding: 'b0'},
            {name: 'testDataComponent1', binding: 'b1', type: 'date'},
            {name: 'testDataComponent2', binding: 'b2', type: 'number'},
            {name: 'testDataComponent3', binding: 'b3', type: 'bool'}
        ]});

        form.initialize();
        form.eventManager.trigger('data:b0', '2015-10-08T23:37:35.468Z');
        expect(form.items[0].getValue()).toEqual(jasmine.any(String));
        expect('2015-10-08T23:37:35.468Z').toBe(form.items[0].getValue());

        form.eventManager.trigger('data:b1', '2015-10-08T23:37:35.468Z');
        expect(form.items[1].getValue()).toEqual(jasmine.any(Date));
        expect('2015-10-08T23:37:35.468Z').toBe(form.items[1].getValue().toISOString());

        form.eventManager.trigger('data:b2', '10');
        expect(10).toBe(form.items[2].getValue());

        form.eventManager.trigger('data:b2', 11);
        expect(11).toBe(form.items[2].getValue());

        form.eventManager.trigger('data:b3', 1);
        expect(true).toBe(form.items[3].getValue());

        form.eventManager.trigger('data:b3', false);
        expect(false).toBe(form.items[3].getValue());
    });

    it('should support predefined value', function () {
        var form = new Form({name: 'dataForm', items: [
            {name: 'testDataComponent0', binding: 'b0', value: 'a'},
            {name: 'testDataComponent1', binding: 'b1', type: 'date', value: '2015-10-08T23:37:35'},
            {name: 'testDataComponent2', binding: 'b2', type: 'number', value: 11},
            {name: 'testDataComponent3', binding: 'b3', type: 'bool', value: true}
        ]});

        form.initialize();

        expect('a').toBe(form.items[0].getValue());
        expect('2015-10-08T23:37:35.000Z').toBe(form.items[1].getValue().toISOString());
        expect(11).toBe(form.items[2].getValue());
        expect(true).toBe(form.items[3].getValue());
    });
});