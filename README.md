## Meta-driven architecture ##

Meta - is a way to describe form tree abstractively without any implementation or rendering details. It is a classic JSON tree structure that is fosusing on data form relations inside form rather than rendering details. We do not use classic html markup to describe form due to following reasons:
- we do not want focus on rendering details
- html markup is hard to parse to find out data relations and hard to describe this relations using 'data-' attributes only
- we want have abstract form declaration and have freedom to select form renderers that may use its owm form generation engine, e.g. ExtJS, Polymer, React.
- we want to live is REST word so JSON/XML data formats is more preffered to our needs
- we do not want limitation is using just HTML markup on our devices

### Component groups ###
As we focus on data relations but not rendering details all our components may be divided into groups:
- simple data components to work with primitive values or objects
- collection data components to work with collection of values
- containers to aggregate other controls
- forms to aggregate all controls in one logical container

### Simple data component ###
Simple data component allow to work with primitive values like bool, string, number or with simple objects and may be desrcibed using next properties:
- binding - path to data in data tree to organize two-directional data binding to work with this value
- type - data type (string, number, bool, object)
- renderer - control to be used to draw this component. It is optional parameter. When renderer is not specified - component would be created in memory

### Collection data component ###
Collection data components allow to work with list of values and should supports CRUD for its childs. This components can be described using next properties:
- binding - path to data in data tree to organize two-directional data binding to work with this value
- renderer - control to be used to draw this component. It is optional parameter. When renderer is not specified - component would be created in memory

### Containers ###
Containers are the repository for other simple controls or other containers. Using this components we can create form tree. This components can be described using next properties:
- children - array of child
- renderer - control to be used to draw this component. It is optional parameter. When renderer is not specified - component would be created in memory

### Forms ###
Form is a logical container to be used to aggreate all form-specific controls and create relations between them and create API to work with this logical container (validation, action executing etc)

### Component UI properties ###
Each component supports UI specific properties to be used by renderer to draw control as expected. Examples of UI specific properties are:
- label - form field label as short control puprose description
- placeholder - value to be showed in empty controls, like 'enter name...' or 'select...'
- tooltip - control tooltip
- layout - label & editor placement variety

### Component Validation properties ###
Data bounded components should pass validation check before action executing to ensure data validity. Field validation can be described using validation attributes:
- required
- min
- max
- custom validator

### Component Action properties ###
Components also should allow describe reactions to field specific actions, e.g. click on button or change on input field. Actions can be described using attributes:
- action - action name to be executed when field action occurs
- confirmarion - confirmation message to be showed before action executing. User should allow or decline executing

### Component Filtration properties ###
Dictionary based components should support filtration and filtration process should be described declaratilvely. Filtration can be described using attributes:
- by - the field to be used to check with
- comparator - comparision fucntion to be used to compare values
- val - value to be used as second comparator operand. This can be static value or refernce to data in data model to check with
