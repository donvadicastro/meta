export const dataBindingWithDictionaries = `

name: dataBindingWithDictionaries
ui:
  label: Data binding with dictionaries
items:
  - name: section
    renderer: section
    items:
      - name: static-dropdowns
        renderer: container
        ui:
          label: Static dictionary form
        items:
          - name: static-dropdowns-1
            binding: static1
            dictionary: static
            renderer: dropdown
            ui:
              label: Dictionary with static content
          - name: static-dropdowns-2
            binding: static1.key
            renderer: label
            ui:
              label: String readonly field (bound to dropdown selected key field)
          - name: static-dropdowns-3
            binding: static1.name
            renderer: label
            ui:
              label: String readonly field (bound to dropdown selected value field)
      - name: dynamic-dropdowns
        renderer: container
        ui:
          label: Dynamic dictionary form
        items:
          - name: dynamic-dropdowns-1
            binding: dynamic1
            dictionary: https://restcountries.com/v3.1/all
            renderer: dropdown
            ui:
              displayField: name.common
              label: Dictionary with dynamic content
          - name: dynamic-dropdowns-2
            binding: dynamic1.name.common
            renderer: label
            ui:
              label: String readonly field (bound to dropdown selected key field)
          - name: dynamic-dropdowns-3
            binding: dynamic1.region
            renderer: label
            ui:
              label: String readonly field (bound to dropdown selected value field)
dictionaries:
  static:
    - key: 1
      name: first
    - key: 2
      name: second
    - key: 3
      name: third
`;
