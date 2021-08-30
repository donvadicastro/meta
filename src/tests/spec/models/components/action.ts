import {Form} from "../../../../app/models/components/form";
import sinon from "sinon";
import {expect} from "chai";
import {ActionFactory} from '../../../../app/actions/factory';

describe('Models: Action',  () => {
    it('should execute action', () => {
        const form = new Form({name: 'testFormComponent', items: [{name: 'child1', action: {name: 'formValidate'}}]}),
            validateSpy = sinon.spy(form, 'validate');

        form.initialize();
        form.items[0].execute();

        expect(validateSpy.called).to.be.true;
    });

    it('should execute custom action', () => {
        const form = new Form({name: 'testFormComponent', items: [{name: 'child1', action: {name: 'custom'}}]}),
            mockFn = sinon.mock();

        ActionFactory.put('custom', mockFn);

        form.initialize();
        form.items[0].execute();

        expect(mockFn.called).to.be.true;
    });

    it('should support chain of success actions', async () => {
        const
            mockFn1 = sinon.mock().returns(Promise.resolve(true)),
            mockFn2 = sinon.mock().returns(Promise.resolve(true)),
            form = new Form({name: 'testFormComponent', items: [
                {name: 'child1', action: [{name: 'custom1'}, {name: 'custom2'}]}
            ]});

        ActionFactory.put('custom1', mockFn1);
        ActionFactory.put('custom2', mockFn2);

        form.initialize();
        expect(await form.items[0].execute()).to.be.true;

        expect(mockFn1.called).to.be.true;
        expect(mockFn2.called).to.be.true;
    });

    it('should return of first failed action in chain', async () => {
        const
            mockFn1 = sinon.mock().returns(Promise.resolve(false)),
            mockFn2 = sinon.mock().returns(Promise.resolve(true)),
            form = new Form({name: 'testFormComponent', items: [
                    {name: 'child1', action: [{name: 'custom1'}, {name: 'custom2'}]}
                ]});

        ActionFactory.put('custom1', mockFn1);
        ActionFactory.put('custom2', mockFn2);

        form.initialize();
        expect(await form.items[0].execute()).to.be.false;

        expect(mockFn1.called).to.be.true;
        expect(mockFn2.called).to.be.false;
    });
});
