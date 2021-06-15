import {ContainerBase} from "../../../../app/models/components/base/container";
import {ElementBase} from "../../../../app/models/components/base/base/element";
import {expect} from "chai";

describe('Models: Container', function () {
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
});
