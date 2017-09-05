import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom'; 
import Cookies from 'js-cookie';

import 'index.scss';
import Header from './Header';
import SignInForm from './form/SignInForm';

import requireLogin from './HOC/requireLogin';
import UserProfilePage from '../pages/UserProfilePage';
import TimelineFeedPage from '../pages/TimelineFeedPage';

import * as userActions from '../stores/User/modules';
import { gql } from 'react-apollo';

if (process.env.NODE_ENV !== 'production') {
  window.gql = gql;
}

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    /* [FIXME] 盡量簡化初始化邏輯，是否統一使用 action 來獲取 Cookie? */
    const userId = Cookies.get('uid');
    if (userId) {
      this.props.fetchProfileRequest(userId);  
    }
    
    this.props.initUserInfo({
      jwt_token: Cookies.get('jwt_token'),
      userId: Cookies.get('uid'),
      isLoggedIn: !!Cookies.get('jwt_token'),
    });
  }

  getChildContext() {
    return {
      jwtToken: Cookies.get('jwt_token') || '',
      isLoggedIn: !!Cookies.get('jwt_token'),
      userId: Cookies.get('uid')
    }
  }

  render() {
    return (
      <div>
        <Header signoutRequest={this.props.signoutRequest} />
        <div className="offset-top">
          <Route exact path="/" component={requireLogin(TimelineFeedPage)} />
          <Route path="/timeline" component={requireLogin(TimelineFeedPage)} />
          <Route path="/user/login" component={SignInForm} />
          <Route path="/user/:id/profile" component={requireLogin(UserProfilePage)} />
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

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  initUserInfo: bindActionCreators(userActions.initUserInfo, dispatch),
  fetchProfileRequest: bindActionCreators(userActions.fetchProfileRequest, dispatch),
  signoutRequest: bindActionCreators(userActions.signoutRequest, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Root);
