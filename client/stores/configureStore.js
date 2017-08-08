import { createStore, applyMiddleware, combineReducers } from 'redux';
import { ApolloClient } from 'react-apollo';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import rootReducers from './reducers';
import rootEpics    from './epics';

const client = new ApolloClient('/graphql');
const epicMiddleware = createEpicMiddleware(rootEpics);
const middleware = [epicMiddleware, client.middleware()];


if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger();
  middleware.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const configureStore = (initialState = {}) => {
  const store = createStoreWithMiddleware(
    combineReducers({...rootReducers, apollo: client.reducer()}),
    initialState,
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : function(){}
  );
  
  
  if (module.hot) {
    module.hot.accept('./reducers.js', () => {
      const nextRootReducer = require('./reducers.js');
      store.replaceReducer(nextRootReducer);
    });
  }

  return [store, client];
};

export default configureStore;
