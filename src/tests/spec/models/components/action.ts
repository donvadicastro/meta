import {Form} from "../../../../app/models/components/form";
import sinon from "sinon";
import {expect} from "chai";
import * as Actions from '../../../../app/actions';

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

        Actions['custom'] = mockFn;

        form.initialize();
        form.items[0].execute();

        expect(mockFn.called).to.be.true;
    });
});
