import {Form} from "../../../../app/models/components/form";
import {ResourceManager} from "../../../../app/managers/resourceManager";
import {expect} from "chai";

describe('Models: Form', function () {
    it('should create _form component correct', function () {
        const element = new Form({name: 'testContainerComponent', items: [{name: 'child1', binding: 'b1'}, {name: 'child2', binding: 'b2'}]});
        element.initialize();

        expect('testContainerComponent').to.equal(element.name);
        expect(2).to.equal(element.items.length);

        expect('child1').to.equal(element.items[0].name);
        expect('child2').to.equal(element.items[1].name);
    });

    it('should save _form reference child level', function () {
        const element = new Form({name: 'testContainerComponent', items: [{name: 'child1', binding: 'b1'}, {name: 'child2', binding: 'b2'}]});
        element.initialize();

        expect(element).to.equal(element.items[0]._form);
    });

    it('should create data model correct', function () {
        const element = new Form({name: 'testContainerComponent'});
        element.initialize();

        element.eventManager.trigger('data:*', 'prop1.prop2.prop3', 'aa');
        expect({prop1: {prop2: {prop3: 'aa'}}}).to.deep.equal(element.data);

        element.data = {};
        element.eventManager.trigger('data:*', 'prop1', 'aa');
        expect({prop1: 'aa'}).to.deep.equal(element.data);

        element.data = {};
        element.eventManager.trigger('data:*', 'prop1', {id:1, name: 'aa'});
        expect({prop1: {id:1, name: 'aa'}}).to.deep.equal(element.data);

        element.data = {};
        element.eventManager.trigger('data:*', 'prop1', 'aa');
        element.eventManager.trigger('data:*', 'prop2', 'bb');
        expect({prop1: 'aa', prop2: 'bb'}).to.deep.equal(element.data);

        element.data = {};
        element.eventManager.trigger('data:*', 'prop1.prop2', 'aa');
        element.eventManager.trigger('data:*', 'prop1.prop3', 'bb');
        expect({prop1: {prop2: 'aa', prop3: 'bb'}}).to.deep.equal(element.data);

        element.data = {};
        element.eventManager.trigger('data:*', 'prop1.prop3', 'aa');
        element.eventManager.trigger('data:*', 'prop2.prop4', 'bb');
        expect({prop1: {prop3: 'aa'}, prop2: {prop4: 'bb'}}).to.deep.equal(element.data);
    });

    it('should support full form validation', function () {
        const element = new Form({name: 'testFormComponent', items: [
            {name: 'child1', binding: 'b1', validation: {required: true}},
            {name: 'child2', binding: 'b2', validation: {required: true}},
            {name: 'child3', items: [
                {name: 'child31', binding: 'b31', validation: {required: true}},
                {name: 'child32', binding: 'b32', validation: {required: true}},
                {name: 'child33', items: [
                    {name: 'child331', binding: 'b331', validation: {required: true}},
                    {name: 'child332', binding: 'b332', validation: {required: true}},
                    {name: 'child333'}
                ]}
            ]}
        ]});

        const msg = ResourceManager.get('validators.requiredValidator.message');

        element.initialize();

        expect(element.validate().isValid).to.be.false;
        expect(element._form.invalidElements).to.deep.equal({'child1': msg, 'child2': msg, 'child31': msg, 'child32': msg, 'child331': msg, 'child332': msg});
        //
        // element.items[0].setValue('a');
        // element.items[1].setValue('a');
        // expect(element.validate().isValid).to.be.false;
        // expect(element._form.invalidElements).to.deep.equal({'child31': msg, 'child32': msg, 'child331': msg, 'child332': msg});
        //
        // element.items[2].items[0].setValue('a');
        // element.items[2].items[1].setValue('a');
        // expect(element.validate().isValid).to.be.false;
        // expect(element._form.invalidElements).to.deep.equal({'child331': msg, 'child332': msg});
        //
        // element.items[2].items[2].items[0].setValue('a');
        // element.items[2].items[2].items[1].setValue('a');
        // expect(element.validate().isValid).to.be.true;
        // expect(element._form.invalidElements).to.deep.equal({});
        //
        // element.items[2].items[2].items[0].setValue('');
        // element.items[2].items[2].items[1].setValue('');
        // expect(element.validate().isValid).to.be.false;
        // expect(element._form.invalidElements).to.deep.equal({'child331': msg, 'child332': msg});
    });

    it('should allow to change component validation status when data was changed another way', function () {
        const element1 = new Form({name: 'testContainerComponent', items: [{name: 'child1', binding: 'b1', validation: {required: true}}]}),
            element2 = new Form({name: 'testContainerComponent', items: [{name: 'child1', binding: 'b1', value: 'a', validation: {required: true}}]});

        element1.initialize();
        element2.initialize();

        element1.validate();
        element2.validate();
        expect(element2.invalidElements).to.deep.equal({});

        element1.eventManager.trigger('data:b1', 'a');
        element2.eventManager.trigger('data:b1', '');

        expect(element1.invalidElements).to.deep.equal({});
        expect(element2.invalidElements).to.deep.equal({child1: ResourceManager.get('validators.requiredValidator.message')});
    });

    describe('setting value', () => {
        it('should properly bind data', () => {
            const form = new Form({name: 'testContainerComponent',
                items: [
                    {name: 'child1', binding: 'b1'},
                    {name: 'child2', binding: 'b2.b3.b4'},
                ]
            });

            form.initialize();
            form.setValue({b1: 'abc', b2: {b3: {b4: 'cde'}}});

            expect('abc', form.items[0].getValue());
            expect('cde', form.items[1].getValue());
        });
    });
});
