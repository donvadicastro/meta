import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import App2 from "./app/app2.jsx";
import App from "./app/app";

ReactDOM.render(
  <StrictMode>
    <App2 />
    <App />
  </StrictMode>,
  document.getElementById('root')
);
