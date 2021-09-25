import {DataBase} from "../../../../app/models/components/base/data";
import {Form} from "../../../../app/models/components/form";
import {expect} from "chai";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import sinon, {SinonSpy} from "sinon";

describe('Models: Data', () => {
    let mock: MockAdapter;
    let axiosSpy: SinonSpy;

    before(() => {
        mock = new MockAdapter(axios);
        axiosSpy = sinon.spy(axios, 'get');
    });

    after(() => {
        mock.reset();
        axiosSpy.restore();
    });

    it('should create data component correct', () => {
        const element = new DataBase({name: 'testDataComponent', binding: 'binding'});

        expect('testDataComponent').to.equal(element.name);
        expect('binding').to.equal(element.binding);

        expect(element.setValue).not.to.be.undefined;
        expect(element.getValue).not.to.be.undefined;
    });

    it('should support simple data binding', () => {
        const form = new Form({name: 'dataForm', items: [{name: 'e1', binding: 'b1'}]});
        form.initialize();

        expect(form.data.b1).to.be.undefined;

        form.items[0].setValue('a');
        expect('a').to.equal(form.data.b1);
        expect('a').to.equal(form.items[0].getValue());
    });

    it('should support data convertions', () => {
        const form = new Form({name: 'dataForm', items: [
            {name: 'testDataComponent0', binding: 'b0'},
            {name: 'testDataComponent1', binding: 'b1', type: 'date'},
            {name: 'testDataComponent2', binding: 'b2', type: 'number'},
            {name: 'testDataComponent3', binding: 'b3', type: 'bool'}
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

        form.eventManager.trigger('data:b3', 'false');
        expect(false).to.equal(form.items[3].getValue());

        form.eventManager.trigger('data:b3', 'true');
        expect(true).to.equal(form.items[3].getValue());

        form.eventManager.trigger('data:b3', '0');
        expect(false).to.equal(form.items[3].getValue());

        form.eventManager.trigger('data:b3', '1');
        expect(true).to.equal(form.items[3].getValue());
    });

    it('should support predefined value', () =>  {
        const form = new Form({name: 'dataForm', items: [
            {name: 'testDataComponent0', binding: 'b0', value: 'a'},
            {name: 'testDataComponent1', binding: 'b1', type: 'date', value: '2015-10-08T23:37:35'},
            {name: 'testDataComponent2', binding: 'b2', type: 'number', value: 11},
            {name: 'testDataComponent3', binding: 'b3', type: 'bool', value: true}
        ]});

        form.initialize();

        expect('a').to.equal(form.items[0].getValue());
        expect('2015-10-08T20:37:35.000Z').to.equal(form.items[1].getValue().toISOString());
        expect(11).to.equal(form.items[2].getValue());
        expect(true).to.equal(form.items[3].getValue());
    });

    it('should support object data binding with property binding', () => {
        const data = {prop: 123, complex: {prop: '456'}};
        const form = new Form({name: 'dataForm', items: [
            {name: 'e1', binding: 'b1'},
            {name: 'e2', binding: 'b1.prop'},
            {name: 'e3', binding: 'b1.complex.prop'},
        ]});

        form.initialize();

        form.items[0].setValue(data);
        expect(data).to.deep.equal(form.data.b1);
        expect(data).to.deep.equal(form.items[0].getValue());

        expect(123).to.equal(form.data.b1.prop);
        expect(123).to.equal(form.items[1].getValue());

        expect('456').to.equal(form.data.b1.complex.prop);
        expect('456').to.equal(form.items[2].getValue());
    });

    it('should support "valueSource" properly', (done) => {
        const data = {deep: {structure: {source: 'abc'}}};
        mock.onGet('path').reply(200, data);

        const form = new Form({name: 'dataForm', items: [
            {name: 'e1', binding: 'b1', valueSource: 'path'}
        ]});

        form.initialize();

        setTimeout(() => {
            expect(axiosSpy.calledWith('path')).to.be.true;
            expect(data).to.deep.equal(form.data.b1);
            expect(data).to.deep.equal(form.items[0].getValue());
            done();
        }, 100);
    });
});
