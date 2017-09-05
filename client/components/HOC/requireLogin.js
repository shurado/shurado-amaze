import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { branch } from 'recompose';

/**
 * 要求使用者登入，從 context 判斷需要登入狀態，如果已經登入則繼續，如果還沒登入則 render 登入頁面
 * @param  {[type]} ) [description]
 * @return {[type]}   [description]
 */
const requireLogin = (WrappedComponent) => {
  class LoginProvider extends React.Component {
    constructor(props, context) {
      super(props, context);
    
    }

    render() {
      return this.context.isLoggedIn ? <WrappedComponent {...this.props} /> : <Redirect to="/user/login"/>
    }
  }

  LoginProvider.contextTypes = {
    isLoggedIn: PropTypes.bool
  }

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  LoginProvider.displayName = `LoginProvider(${wrappedComponentName})`;


  return LoginProvider;
}

export default requireLogin;
