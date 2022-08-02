## Meta-driven architecture ##

Meta - is a way to describe form tree abstractively without any implementation or rendering details. It is a classic JSON tree structure that is fosusing on data form relations inside form rather than rendering details. We do not use classic html markup to describe form due to following reasons:
- we do not want focus on rendering details
- html markup is hard to parse to find out data relations and hard to describe this relations using 'data-' attributes only
- we want have abstract form declaration and have freedom to select form renderers that may use its owm form generation engine, e.g. ExtJS, Polymer, React.
- we want to live is REST word so JSON/XML data formats is more preffered to our needs
- we do not want limitation is using just HTML markup on our devices

Detailed architecture description can be found on [wiki](../../wiki).

Form generation playground: https://meta-renderer-react.vercel.app/
