import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider 
} from 'react-apollo';

import configureStore from './stores/configureStore'
import Root from './components/Root';

// console.log(browserHistory);

const client = new ApolloClient('/graphql');

const store = configureStore();

render(
  <ApolloProvider client={client} store={store}>
    <BrowserRouter>
      <Route path="/" component={Root} />     
    </BrowserRouter>
  </ApolloProvider>,
  document.querySelector('#app')
);
