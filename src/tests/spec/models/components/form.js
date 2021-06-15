"use strict";
var form_1 = require("../../../../app/models/components/form");
var toEqualData_1 = require("../../../matchers/toEqualData");
var resourceManager_1 = require("../../../../app/managers/resourceManager");
describe('Models: Form', function () {
    beforeEach(function () {
        jasmine.addMatchers({ toEqualData: toEqualData_1["default"] });
    });
    it('should create _form component correct', function () {
        var element = new form_1.Form({ name: 'testContainerComponent', items: [{ name: 'child1', binding: 'b1' }, { name: 'child2', binding: 'b2' }] });
        element.initialize();
        expect('testContainerComponent').toBe(element.name);
        expect(2).toBe(element.items.length);
        expect('child1').toBe(element.items[0].name);
        expect('child2').toBe(element.items[1].name);
    });
    it('should save _form reference child level', function () {
        var element = new form_1.Form({ name: 'testContainerComponent', items: [{ name: 'child1', binding: 'b1' }, { name: 'child2', binding: 'b2' }] });
        element.initialize();
        expect(element).toBe(element.items[0]._form);
    });
    it('should create data model correct', function () {
        var element = new form_1.Form({ name: 'testContainerComponent' });
        element.initialize();
        element.eventManager.trigger('data:*', 'prop1.prop2.prop3', 'aa');
        expect({ prop1: { prop2: { prop3: 'aa' } } }).toEqualData(element.data);
        element.data = {};
        element.eventManager.trigger('data:*', 'prop1', 'aa');
        expect({ prop1: 'aa' }).toEqualData(element.data);
        element.data = {};
        element.eventManager.trigger('data:*', 'prop1', { id: 1, name: 'aa' });
        expect({ prop1: { id: 1, name: 'aa' } }).toEqualData(element.data);
        element.data = {};
        element.eventManager.trigger('data:*', 'prop1', 'aa');
        element.eventManager.trigger('data:*', 'prop2', 'bb');
        expect({ prop1: 'aa', prop2: 'bb' }).toEqualData(element.data);
        element.data = {};
        element.eventManager.trigger('data:*', 'prop1.prop2', 'aa');
        element.eventManager.trigger('data:*', 'prop1.prop3', 'bb');
        expect({ prop1: { prop2: 'aa', prop3: 'bb' } }).toEqualData(element.data);
        element.data = {};
        element.eventManager.trigger('data:*', 'prop1.prop3', 'aa');
        element.eventManager.trigger('data:*', 'prop2.prop4', 'bb');
        expect({ prop1: { prop3: 'aa' }, prop2: { prop4: 'bb' } }).toEqualData(element.data);
    });
    it('should support full form validation', function () {
        var element = new form_1.Form({ name: 'testFormComponent', items: [
                { name: 'child1', binding: 'b1', validation: { required: true } },
                { name: 'child2', binding: 'b2', validation: { required: true } },
                { name: 'child3', items: [
                        { name: 'child31', binding: 'b31', validation: { required: true } },
                        { name: 'child32', binding: 'b32', validation: { required: true } },
                        { name: 'child33', items: [
                                { name: 'child331', binding: 'b331', validation: { required: true } },
                                { name: 'child332', binding: 'b332', validation: { required: true } },
                                { name: 'child333' }
                            ] }
                    ] }
            ] });
        var msg = resourceManager_1.ResourceManager.get('validators.requiredValidator.message');
        element.initialize();
        expect(element.validate().isValid).to.be.false;
        expect(element._form.invalidElements).toEqualData({ 'child1': msg, 'child2': msg, 'child31': msg, 'child32': msg, 'child331': msg, 'child332': msg });
        //
        // element.items[0].setValue('a');
        // element.items[1].setValue('a');
        // expect(element.validate().isValid).to.be.false;
        // expect(element._form.invalidElements).toEqualData({'child31': msg, 'child32': msg, 'child331': msg, 'child332': msg});
        //
        // element.items[2].items[0].setValue('a');
        // element.items[2].items[1].setValue('a');
        // expect(element.validate().isValid).to.be.false;
        // expect(element._form.invalidElements).toEqualData({'child331': msg, 'child332': msg});
        //
        // element.items[2].items[2].items[0].setValue('a');
        // element.items[2].items[2].items[1].setValue('a');
        // expect(element.validate().isValid).to.be.true;
        // expect(element._form.invalidElements).toEqualData({});
        //
        // element.items[2].items[2].items[0].setValue('');
        // element.items[2].items[2].items[1].setValue('');
        // expect(element.validate().isValid).to.be.false;
        // expect(element._form.invalidElements).toEqualData({'child331': msg, 'child332': msg});
    });
    it('should allow to change component validation status when data was changed another way', function () {
        var element1 = new form_1.Form({ name: 'testContainerComponent', items: [{ name: 'child1', binding: 'b1', validation: { required: true } }] }), element2 = new form_1.Form({ name: 'testContainerComponent', items: [{ name: 'child1', binding: 'b1', value: 'a', validation: { required: true } }] });
        element1.initialize();
        element2.initialize();
        element1.validate();
        element2.validate();
        expect(element2.invalidElements).toEqualData({});
        element1.eventManager.trigger('data:b1', 'a');
        element2.eventManager.trigger('data:b1', '');
        expect(element1.invalidElements).toEqualData({});
        expect(element2.invalidElements).toEqualData({ child1: resourceManager_1.ResourceManager.get('validators.requiredValidator.message') });
    });
});
//# sourceMappingURL=form.js.map
