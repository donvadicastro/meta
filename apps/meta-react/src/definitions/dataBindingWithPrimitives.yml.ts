export const dataBindingWithPrimitives = `
name: dataBindingWithPrimitives
ui:
  label: Data binding with primitives
items:
  - name: section
    renderer: section
    items:
      - name: data-types
        renderer: container
        ui:
          label: Data types
        items:
          - name: data-types-string
            binding: b1
            renderer: textbox
            ui:
              label: String field type
          
          - name: data-types-number
            binding: b2
            renderer: textbox
            ui:
              label: Number field type
            type: number
            
          - name: data-types-boolean
            binding: b3
            renderer: textbox
            ui:
              label: Boolean field type
            type: bool

      - name: data-binding
        renderer: container
        ui:
          label: Data binding
        items:
          - name: data-binding-field1
            binding: b1
            renderer: textbox
            ui:
              label: String field is bound to "dataModel -> b1" path
          - name: data-binding-field2
            binding: b1
            renderer: textbox
            ui:
              label: String field is bound to the same path
`;
