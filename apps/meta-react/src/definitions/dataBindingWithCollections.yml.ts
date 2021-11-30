export const dataBindingWithCollections = `
name: dataBindingWithCollectionsForm
ui:
  label: Data binding with collections
items:
  - name: section
    renderer: section
    items:
      - name: remote-list
        binding: binding
        renderer: table
        valueSource: https://restcountries.com/v3.1/all
        type: list
        ui:
          label: Remote list
        items:
          - name: name
            binding: name.official
          - name: region
            binding: region
`;
