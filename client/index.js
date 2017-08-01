import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import configureStore from './stores/configureStore.js'

import { BrowserRouter, Route, Link} from 'react-router-dom';

import Root from './components/Root';

// console.log(browserHistory);

const store = configureStore();

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={Root} />     
    </BrowserRouter>
  </Provider>,
  document.querySelector('#app')
);
