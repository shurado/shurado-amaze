/*
 * Only catch action exception.
 * const thunk = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action)
 * 
 */
const reporterMiddleware = store => next => action => {
  try {
    return next(action);
  } catch(err) {
    console.error('Caught an exception', err);

    if (process.env.NODE_ENV === 'production') {
      /* send error. */
    }
  }
}