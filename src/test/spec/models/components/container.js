/// <reference path="../../../../../typings/globals/jasmine/index.d.ts" />
"use strict";
var container_1 = require("../../../../app/models/components/base/container");
var element_1 = require("../../../../app/models/components/base/base/element");
describe('Models: Container', function () {
    it('should create container component correct', function () {
        var element = new container_1.ContainerBase({ name: 'testContainerComponent', items: [
                { name: 'child1', binding: 'b1' },
                { name: 'child2', binding: 'b2' }
            ] });
        element.initialize();
        expect('testContainerComponent').toBe(element.name);
        expect(2).toBe(element.items.length);
        expect('child1').toBe(element.items[0].name);
        expect('child2').toBe(element.items[1].name);
    });
    it('_parent-child relations should be stored', function () {
        var element = new container_1.ContainerBase({ name: 'testContainerComponent', items: [{ name: 'child1', binding: 'b1' }, { name: 'child2', binding: 'b2' }] });
        element.initialize();
        expect(element).toBe(element.items[0]._parent);
    });
    it('should support adding item', function () {
        var element = new container_1.ContainerBase({ name: 'testContainerComponent' }), child = new element_1.ElementBase({ name: 'testComponent' });
        element.initialize();
        element.add(child);
        expect(child).toBe(element.items[0]);
        expect(element).toBe(child._parent);
    });
    it('should support deleting item', function () {
        var element = new container_1.ContainerBase({ name: 'testContainerComponent', items: [{ name: 'child1', binding: 'b1' }, { name: 'child2', binding: 'b2' }] });
        element.initialize();
        var child = element.items[0];
        expect(element).toBe(child._parent);
        element.remove(element.items[0]);
        expect(1).toBe(element.items.length);
        expect(child._parent).toBeUndefined();
    });
    it('should support move element', function () {
        var element1 = new container_1.ContainerBase({ name: 'testContainerComponent1', items: [{ name: 'child1', binding: 'b1' }] }), element2 = new container_1.ContainerBase({ name: 'testContainerComponent2', items: [{ name: 'child2', binding: 'b2' }] });
        element1.initialize();
        element2.initialize();
        expect(element1).toBe(element1.items[0]._parent);
        element2.move(element1.items[0]);
        expect(0).toBe(element1.items.length);
        expect(2).toBe(element2.items.length);
        expect(element2).toBe(element2.items[0]._parent);
        expect(element2).toBe(element2.items[1]._parent);
    });
    it('should support children validation', function () {
        var element = new container_1.ContainerBase({ name: 'testContainerComponent1', items: [
                { name: 'child1', binding: 'b1', validation: { required: true } },
                { name: 'child2', binding: 'b2', validation: { required: true } },
                { name: 'child3' }
            ] });
        element.initialize();
        expect(element.validate().isValid).toBeFalsy();
        element.items[0].setValue('a');
        expect(element.validate().isValid).toBeFalsy();
        element.items[1].setValue('a');
        expect(element.validate().isValid).toBeTruthy();
    });
});
//# sourceMappingURL=container.js.map