import {ContainerBase} from "../../../src/models/components/base/container";
import {ElementBase} from "../../../src/models/components/base/base/element";
import {expect} from "chai";
import {Form} from "../../../src/models/components/form";
import MockAdapter from "axios-mock-adapter";
import sinon, {SinonSpy} from "sinon";
import axios from "axios";

describe('Models: Container', function () {
    let mock: MockAdapter;
    let axiosSpy: SinonSpy;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        axiosSpy = sinon.spy(axios, 'get');
    });

    afterAll(() => {
        mock.reset();
        axiosSpy.restore();
    });

    it('should create container component correct', function () {
        var element = new ContainerBase({name: 'testContainerComponent', items: [
            {name: 'child1', binding: 'b1'},
            {name: 'child2', binding: 'b2'}
        ]});

        element.initialize();

        expect('testContainerComponent').to.equal(element.name);
        expect(2).to.equal(element.items.length);

        expect('child1').to.equal(element.items[0].name);
        expect('child2').to.equal(element.items[1].name);
    });

    it('_parent-child relations should be stored', function () {
        var element = new ContainerBase({name: 'testContainerComponent', items: [{name: 'child1', binding: 'b1'}, {name: 'child2', binding: 'b2'}]});

        element.initialize();
        expect(element).to.equal(element.items[0]._parent);
    });

    it('should support adding item', function () {
        var element = new ContainerBase({name: 'testContainerComponent'}),
            child = new ElementBase({name: 'testComponent'});

        element.initialize();
        element.add(child);

        expect(child).to.equal(element.items[0]);
        expect(element).to.equal(child._parent);
    });

    it('should support deleting item', function () {
        var element = new ContainerBase({name: 'testContainerComponent', items: [{name: 'child1', binding: 'b1'}, {name: 'child2', binding: 'b2'}]});
        element.initialize();

        var child = element.items[0];
        expect(element).to.equal(child._parent);
        element.remove(element.items[0]);

        expect(1).to.equal(element.items.length);
        expect(child._parent).to.be.undefined;
    });

    it('should support move element', function () {
        var element1 = new ContainerBase({name: 'testContainerComponent1', items: [{name: 'child1', binding: 'b1'}]}),
            element2 = new ContainerBase({name: 'testContainerComponent2', items: [{name: 'child2', binding: 'b2'}]});

        element1.initialize();
        element2.initialize();

        expect(element1).to.equal(element1.items[0]._parent);
        element2.move(element1.items[0]);

        expect(0).to.equal(element1.items.length);
        expect(2).to.equal(element2.items.length);
        expect(element2).to.equal(element2.items[0]._parent);
        expect(element2).to.equal(element2.items[1]._parent);
    });

    it('should support children validation', function () {
        var element = new ContainerBase({name: 'testContainerComponent1', items: [
            {name: 'child1', binding: 'b1', validation: {required: true}},
            {name: 'child2', binding: 'b2', validation: {required: true}},
            {name: 'child3'}
        ]});

        element.initialize();
        expect(element.validate().isValid).to.be.false;

        element.items[0].setValue('a');
        expect(element.validate().isValid).to.be.false;

        element.items[1].setValue('a');
        expect(element.validate().isValid).to.be.true;
    });

    it('should support "valueSource" properly', (done) => {
        const data = {deep: {structure: {source: 'abc'}}, b2: 'val'};
        mock.onGet('path').reply(200, data);

        const form = new Form({name: 'dataForm', binding: 'b1', valueSource: 'path', items: [
                {name: 'e1', binding: 'b2'},
                {name: 'e2', binding: 'deep.structure.source'},
            ]});

        form.initialize();

        setTimeout(() => {
            expect(axiosSpy.calledWith('path')).to.be.true;
            expect(data).to.deep.equal(form.data.b1);
            expect(data).to.deep.equal(form.getValue());
            expect('val').to.deep.equal(form.items[0].getValue());
            expect('abc').to.deep.equal(form.items[1].getValue());
            done();
        }, 0);
    });

    it('should support "valueSource" on container level', (done) => {
        mock.onGet('path1').reply(200, {b1: '1', b2: '2'});
        mock.onGet('path2').reply(200, {b3: '3', b4: '4'});

        const form = new Form({name: 'dataForm', items: [
                {name: 'c1', valueSource: 'path1', binding: 'c1', items: [
                        {name: 'e1', binding: 'b1'},
                        {name: 'e2', binding: 'b2'}
                    ]},
                {name: 'c2', valueSource: 'path2', binding: 'c2', items: [
                        {name: 'e3', binding: 'b3'},
                        {name: 'e4', binding: 'b4'}
                    ]},
            ]});

        form.initialize();

        setTimeout(() => {
            expect(axiosSpy.calledWith('path1')).to.be.true;
            expect(axiosSpy.calledWith('path2')).to.be.true;

            expect({b1: '1', b2: '2'}).to.deep.equal(form.items[0].getValue());
            expect({b3: '3', b4: '4'}).to.deep.equal(form.items[1].getValue());

            expect('1').to.deep.equal(form.items[0].items[0].getValue());
            expect('2').to.deep.equal(form.items[0].items[1].getValue());
            expect('3').to.deep.equal(form.items[1].items[0].getValue());
            expect('4').to.deep.equal(form.items[1].items[1].getValue());

            done();
        }, 0);
    });
});
