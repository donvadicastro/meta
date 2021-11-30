[![Netlify Status](https://api.netlify.com/api/v1/badges/2b9891ae-545f-4782-a368-0bafe4bba538/deploy-status)](https://app.netlify.com/sites/meta-renderer/deploys)

# React meta renderer
React renderer for a forms designed using [meta-framework](https://github.com/donvadicastro/meta).

## Examples:
### Primitive form:
Allows to represent data model using primitive controls:
- `primitives1` and `primitives4` are bound to same data, so changing data in first automatically replicate data in second
- `primitive2` strict bound to numeric type, so numeric textbox is used to represent this data model
- `primitive3` is bool field, so checker is good option to represent
```
{
    name: 'generalPurposeForm',
    ui: {label: 'Primitive elements and behaviors'},
    items: [
        { name: 'primitives1', binding: 'b1', renderer: 'textbox', 
          ui: {label: 'String field (enter here and see result in label3 as both bound to same data path)'} },
      
        { name: 'primitives2', binding: 'b2', renderer: 'textbox', 
          ui: {label: 'Number field'}, type: 'number' },
      
        { name: 'primitives3', binding: 'b3', renderer: 'textbox', 
          ui: {label: 'Boolean field'}, type: 'bool' },
      
        { name: 'primitives4', binding: 'b1', renderer: 'label', 
          ui: {label: 'String readonly field (bound to first string field)'}}
    ]
}
```
![img.png](assets/images/primitive.png)

### Dictionary forms
Allows representing dropdown list as a datasource for specific data models. Once selected - data is merged into datasource by path.
- `static-dropdowns-1` is bound to dictionary `static` that is defined as part of form declaration, so dropdown will be rendered with list of options from this dictionary
- `static-dropdowns-2` is a label that bound to `b1.key` field (when `b1` is source of selected dictionary value), so will represent selected `key` field
- `static-dropdowns-3` is a label that bound to `b1.name` field, so will represent selected `name` field
- `dynamic-dropdowns-1` and all surrounding labels has same nature, but only dictionary itself is bound to external datasource, specified by URL `https://restcountries.eu/rest/v2/all`
```
{
    name: 'dictionaryForm',
    ui: {label: 'Dictionary Form'},
    items: [
        { name: 'static-dropdowns', renderer: 'container', ui: {'label': 'Static dictionary form'},
            items: [
                { name: 'static-dropdowns-1', binding: 'b1', dictionary: 'static', renderer: 'dropdown', 
                  ui: {label: 'Dictionary with static content'}},
              
                { name: 'static-dropdowns-2', binding: 'b1.key', renderer: 'label', 
                  ui: {label: 'String readonly field (bound to dropdown selected key field)'}},
              
                { name: 'static-dropdowns-3', binding: 'b1.name', renderer: 'label', 
                  ui: {label: 'String readonly field (bound to dropdown selected value field)'}}
            ]},
        { name: 'dynamic-dropdowns', renderer: 'container', ui: {'label': 'Dynamic dictionary form'},
            items: [
                { name: 'dynamic-dropdowns-1', binding: 'b1', dictionary: 'https://restcountries.eu/rest/v2/all', renderer: 'dropdown', 
                  ui: {displayProperty: 'demonym', label: 'Dictionary with static content'}},
              
                { name: 'dynamic-dropdowns-2', binding: 'b1.cioc', renderer: 'label', 
                  ui: {label: 'String readonly field (bound to dropdown selected key field)'}},
              
                { name: 'dynamic-dropdowns-3', binding: 'b1.name', renderer: 'label', 
                  ui: {label: 'String readonly field (bound to dropdown selected value field)'}}
            ]}
    ], dictionaries: {
        static: [
            {key: 1, name: 'first'},
            {key: 2, name: 'second'},
            {key: 3, name: 'third'}
        ]
    }
}
```
![img.png](assets/images/dropdown.png)
