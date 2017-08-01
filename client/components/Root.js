import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom'; 

import Header from './Header';
import Cookies from 'js-cookie';
import SignInForm from './form/SignInForm.js'

import UserProfilePage from '../pages/UserProfilePage';

import * as userActions from '../stores/User/modules';

import "index.scss";


class Root extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const userId = Cookies.get('uid');
    this.props.fetchProfileRequest(userId);
    this.props.initUserInfo({
      jwt_token: Cookies.get('jwt_token'),
      userId: Cookies.get('uid'),
      isLoggedIn: Cookies.get('jwt_token') ? true : false,
    });
  }

  getChildContext() {
    return {
      jwtToken: Cookies.get('jwt_token') || '',
      isLoggedIn: Cookies.get('jwt_token') ? true : false,
      userId: Cookies.get('uid')
    }
  }

  render() {
    return (
      <div>
        <Header signoutRequest={this.props.signoutRequest} />
        <div className="offset-top">
          <Route path="/user/login" component={SignInForm} />
          <Route path="/user/:id/profile" component={UserProfilePage} />
        </div>
      </div>
    );
  }
}

Root.childContextTypes = {
  jwtToken: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  userId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }  
}

const mapDispatchToProps = (dispatch) => {
  return {
    initUserInfo: bindActionCreators(userActions.initUserInfo, dispatch),
    fetchProfileRequest: bindActionCreators(userActions.fetchProfileRequest, dispatch),
    signoutRequest: bindActionCreators(userActions.signoutRequest, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
