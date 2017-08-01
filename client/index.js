import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import configureStore from './stores/configureStore'
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
