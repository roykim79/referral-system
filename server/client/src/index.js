import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import App from "./components/App";
import reducers from './reducers/index'

import 'material-components-web/dist/material-components-web.min.css';
import 'react-table/react-table.css'
import './index.css'
import './App.css'
import 'material-icons'



const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
