import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import configureStore from './stores/configureStore.js'

import Root from './components/Root';

const store = configureStore();

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.body
);