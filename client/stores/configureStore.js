import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import rootReducers from '../reducers';

// const epicMiddleware = createEpicMiddleware();
const middleware = [];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger();
  middleware.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const configureStore = (initialState = {}) => {
  const store = createStoreWithMiddleware(rootReducers, initialState);
  
  if (module.hot) {
    module.hot.accept('../reducers/index.js', () => {
      const nextRootReducer = require('../reducers/index.js');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
