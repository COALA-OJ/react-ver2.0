import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import { BrowserRouter as Router} from 'react-router-dom';
import configureStore from './redux/configureStroe';
const store = configureStore();
ReactDOM.render(
  <Router>
    <Root store={store}/>
  </Router>
    ,document.getElementById('root')
);

