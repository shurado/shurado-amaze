/*
 * Schedule actions without timeout.
 */
const timeoutScheduler = store => next => action => {
  if (!action.meta || !action.meta.delay) {
    return next(action);
  }

  const timeoutId = setTimeout(
    () => next(action),
    action.meta.delay
  );

  return function cancel() {
    clearTimeout(timeoutId);
  }
}

export default timeoutScheduler;