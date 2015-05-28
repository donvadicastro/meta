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
