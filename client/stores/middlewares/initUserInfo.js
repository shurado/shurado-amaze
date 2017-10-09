import Cookies from 'js-cookie';

const middleware = () => store => next => action => {

  if (action === '@@INIT') {
    store.dispatch({
      type: 'INIT_USER_INFO',
      payload: {
        jwtToken: Cookies.get('jwt_token') || '',
        isLoggedIn: !!Cookies.get('jwt_token'),
        userId: Cookies.get('uid'),
      },
    })
  }
}

export default middleware;
