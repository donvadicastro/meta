import React, {useState} from 'react';
import {FormComponentWrapper} from "../components";
import 'bootstrap/dist/css/bootstrap.css';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-xcode";
import {Ace} from "ace-builds";

import {mainFormDefinitionYAML} from "../definitions/custom/mainFormYAML";
import {dataBindingWithPrimitives} from "../definitions/dataBindingWithPrimitives.yml";
import {dataBindingWithDictionaries} from "../definitions/dataBindingWithDictionaries.yml";
import {dataBindingWithCollections} from "../definitions/dataBindingWithCollections.yml";
import {actions} from "../definitions/actions.yml";
import {dynamics} from "../definitions/dynamics.yml";
import {layout} from "../definitions/layout.yml";

const YAML = require('yamljs');

export function App() {
  const [value, setValue] = useState(mainFormDefinitionYAML);

  function onBlur(event: any, editor?: Ace.Editor) {
    try {
      YAML.parse(editor?.getValue());
      editor && setValue(editor.getValue());
    } catch (e) {
      alert(e);
    }
  }

  function loadFile(yml: string) {
    setValue({
      dataBindingWithPrimitives,
      dataBindingWithDictionaries,
      dataBindingWithCollections,
      actions, dynamics, layout}[yml] || '');
  }

  return (
    <div className="min-100 d-flex flex-column overflow-hidden">
      <header className="site-header sticky-top py-2">
        <nav className="container d-flex flex-md-row justify-content-between">
          <a className="py-2" href="#logo" aria-label="Product">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                 className="d-block mx-auto"
                 role="img" viewBox="0 0 24 24"><title>Product</title>
              <circle cx="12" cy="12" r="10"/>
              <path
                d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/>
            </svg>
          </a>
          <a className="py-2 d-none d-md-inline-block" onClick={() => loadFile('dataBindingWithPrimitives')} href="#binding-primitives">
            Data binding with primitives
          </a>
          <a className="py-2 d-none d-md-inline-block" onClick={() => loadFile('dataBindingWithDictionaries')} href="#binding-dictionaries">
            Data binding with dictionaries
          </a>
          <a className="py-2 d-none d-md-inline-block" onClick={() => loadFile('dataBindingWithCollections')} href="#binding-collections">
            Data binding with collections
          </a>
          {/*<a className="py-2 d-none d-md-inline-block" onClick={() => loadFile('dynamics')} href="#dynamics">*/}
          {/*    Dynamics*/}
          {/*</a>*/}
          {/*<a className="py-2 d-none d-md-inline-block" onClick={() => loadFile('actions')} href="#actions">*/}
          {/*    Actions*/}
          {/*</a>*/}
          {/*<a className="py-2 d-none d-md-inline-block" onClick={() => loadFile('layout')} href="#layout">*/}
          {/*    Layout*/}
          {/*</a>*/}
        </nav>
      </header>
      <div className="row flex-grow-1">
        <div className="col-sm-4">
          <AceEditor
            mode="yaml"
            theme="xcode"
            value={value}
            width={"100%"}
            height={"100%"}
            onBlur={onBlur}
            name="FormYamlEditor"
            editorProps={{ $blockScrolling: true }} />
        </div>
        <div className="col-sm-8 pt-2">
          <FormComponentWrapper yaml={value} />
        </div>
      </div>
    </div>
  );
}

export default App;
