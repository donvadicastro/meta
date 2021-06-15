import {DataBase} from "../../../../app/models/components/base/data";
import {Form} from "../../../../app/models/components/form";
import {expect} from "chai";
import {MetaComponentType} from "../../../../app/enums/metaComponentType";

describe('Models: Data', function () {
    it('should create data component correct', function () {
        var element = new DataBase({name: 'testDataComponent', binding: 'binding'});

        expect('testDataComponent').to.equal(element.name);
        expect('binding').to.equal(element.binding);

        expect(element.setValue).not.to.be.undefined;
        expect(element.getValue).not.to.be.undefined;
    });

    it('should support simple data binding', function () {
        var form = new Form({name: 'dataForm', items: [{name: 'e1', binding: 'b1'}]});
        form.initialize();

        expect(form.data.b1).to.be.undefined;

        form.items[0].setValue('a');
        expect('a').to.equal(form.data.b1);
        expect('a').to.equal(form.items[0].getValue());
    });

    it('should support data convertions', function () {
        var form = new Form({name: 'dataForm', items: [
            {name: 'testDataComponent0', binding: 'b0'},
            {name: 'testDataComponent1', binding: 'b1', type: MetaComponentType.Date},
            {name: 'testDataComponent2', binding: 'b2', type: MetaComponentType.Number},
            {name: 'testDataComponent3', binding: 'b3', type: MetaComponentType.Bool}
        ]});

        form.initialize();
        form.eventManager.trigger('data:b0', '2015-10-08T23:37:35.468Z');
        expect(form.items[0].getValue()).to.be.a('string');
        expect('2015-10-08T23:37:35.468Z').to.equal(form.items[0].getValue());

        form.eventManager.trigger('data:b1', '2015-10-08T23:37:35.468Z');
        expect(form.items[1].getValue()).to.be.an.instanceof(Date);
        expect('2015-10-08T23:37:35.468Z').to.equal(form.items[1].getValue().toISOString());

        form.eventManager.trigger('data:b2', '10');
        expect(10).to.equal(form.items[2].getValue());

        form.eventManager.trigger('data:b2', 11);
        expect(11).to.equal(form.items[2].getValue());

        form.eventManager.trigger('data:b3', 1);
        expect(true).to.equal(form.items[3].getValue());

        form.eventManager.trigger('data:b3', false);
        expect(false).to.equal(form.items[3].getValue());
    });

    it('should support predefined value', function () {
        var form = new Form({name: 'dataForm', items: [
            {name: 'testDataComponent0', binding: 'b0', value: 'a'},
            {name: 'testDataComponent1', binding: 'b1', type: MetaComponentType.Date, value: '2015-10-08T23:37:35'},
            {name: 'testDataComponent2', binding: 'b2', type: MetaComponentType.Number, value: 11},
            {name: 'testDataComponent3', binding: 'b3', type: MetaComponentType.Bool, value: true}
        ]});

        form.initialize();

        expect('a').to.equal(form.items[0].getValue());
        expect('2015-10-08T20:37:35.000Z').to.equal(form.items[1].getValue().toISOString());
        expect(11).to.equal(form.items[2].getValue());
        expect(true).to.equal(form.items[3].getValue());
    });
});
