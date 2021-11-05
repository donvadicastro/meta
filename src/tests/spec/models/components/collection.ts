import {CollectionBase} from "../../../../app/models/components/collection";
import {Form} from "../../../../app/models/components/form";
import {expect} from "chai";

describe('Models: Collection', function () {
    it('should create collection component correct', function () {
        const element = new CollectionBase({name: 'testCollectionComponent', binding: 'binding', items: []});

        expect('testCollectionComponent').to.equal(element.name);
        expect('binding').to.equal(element.binding);

        expect(element.setValue).not.to.be.undefined;
        expect(element.getValue).not.to.be.undefined;
    });

    it('should select correct initializer', function () {
        const element = new Form({name: 'testFormComponent', items: [
            {name: 'child', binding: 'b', type: 'list'}
        ]});

        element.initialize();
        expect(element.items[0] instanceof CollectionBase).to.be.true;
    });

    it('should support static filtering', function () {
        const element = new CollectionBase({name: 'testCollectionComponent', binding: 'binding', filters: [{by: 'name', comparator: 'eq', val: 'b'}]});

        element.setValue([{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]);
        expect(element.getValue()).to.deep.equal([{id:2, name: 'b'}]);
    });

    it('should support dynamic filtering', function () {
        const form = new Form({name: 'testFormComponent', items: [
            {name: 'child1', binding: 'b1', type: 'list', filters: [{by: 'name', comparator: 'eq', val: '@b3'}]},
            {name: 'child2', binding: 'b1', type: 'list', filters: [{by: 'name', comparator: '!eq', val: '@b3'}]},
            {name: 'child3', binding: 'b3'}
        ]});
        form.initialize();

        form.data.b1 = [{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}];
        form.eventManager.trigger('data:b1', form.data.b1);
        expect(form.items[0].getValue()).to.deep.equal([]);
        expect(form.items[1].getValue()).to.deep.equal([{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]);

        form.items[2].setValue('c');
        expect(form.items[0].getValue()).to.deep.equal([{id:3, name: 'c'}]);
        expect(form.items[1].getValue()).to.deep.equal([{id:1, name: 'a'},{id:2, name: 'b'}]);

        expect(form.data.b1).to.deep.equal([{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}]);
    });

    describe('Collection wide sorting', () => {
        it('should support ASC sorting (preserve list order)', () => {
            const data = [{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}];
            const element = new CollectionBase({name: 'testSortAsc', binding: 'binding', sort: 'ASC' });

            element.setValue(data);
            expect(element.getValue()).to.deep.eq(data);
        });

        it('should support DESC sorting (reverse list order)', () => {
            const data = [{id:1, name: 'a'},{id:2, name: 'b'},{id:3, name: 'c'}];
            const element = new CollectionBase({name: 'testSortAsc', binding: 'binding', sort: 'DESC' });

            element.setValue(data);
            expect(element.getValue()).to.deep.eq(data.reverse());
        });
    });

    it('should support adding new item', function () {
        const element = new CollectionBase({name: 'testCollectionComponent', binding: 'binding', items: [
            {name: 'child1', binding: 'b1'},
            {name: 'child2', binding: 'b2'}
        ] });

        element.getContainer().items[0].setValue('a');
        element.getContainer().items[1].setValue('b');

        element.addItem(element.getSelected());
        expect(JSON.stringify([{b1: 'a', b2: 'b'}])).to.equal(JSON.stringify(element.getValue()));
    });

    it('should support editing existing item', function () {
        const element = new CollectionBase({name: 'testCollectionComponent', binding: 'binding', items: [
            {name: 'child1', binding: 'b1'},
            {name: 'child2', binding: 'b2'}
        ] });

        element.setValue([{id: -100, b1: 'a', b2: 'b'}]);
        element.setSelected(-100);

        element.getContainer().items[0].setValue('aa');
        element.getContainer().items[1].setValue('bb');

        element.editItem(element.getSelected());
        expect([{id: -100, b1: 'aa', b2: 'bb'}]).to.deep.equal(element.getValue());
    });


    it('should support deleting existing item', function () {
        const element = new CollectionBase({name: 'testCollectionComponent', binding: 'binding', items: [
            {name: 'child1', binding: 'b1'},
            {name: 'child2', binding: 'b2'}
        ] });

        element.setValue([{id: -100, b1: 'a', b2: 'b'}]);

        element.removeItem(-101);
        expect(JSON.stringify([{id: -100, b1: 'a', b2: 'b'}])).to.equal(JSON.stringify(element.getValue()));

        element.removeItem(-100);
        expect(JSON.stringify([])).to.equal(JSON.stringify(element.getValue()));
    });
});
