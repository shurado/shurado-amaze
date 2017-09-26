
const localStorge = store => next => action => {
  const previousToken = store.getState().user.jwtToken;
  next(action);
  const nextToken = store.getState().user.jwtToken;

  if (nextToken !== previousToken) {
    localStorge.setItem('jwtToken', nextToken);
  }
}