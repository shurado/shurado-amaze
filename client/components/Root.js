import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom'; 
import Cookies from 'js-cookie';

import 'index.scss';
import Header from './Header';
import SignInForm from './form/SignInForm';

import UserProfilePage from '../pages/UserProfilePage';
import TimelineFeedPage from '../pages/TimelineFeedPage';

import * as userActions from '../stores/User/modules';

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
          <Route exact path="/" component={LandingPage} />
          <Route path="/timeline" component={TimelineFeedPage} />
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

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  initUserInfo: bindActionCreators(userActions.initUserInfo, dispatch),
  fetchProfileRequest: bindActionCreators(userActions.fetchProfileRequest, dispatch),
  signoutRequest: bindActionCreators(userActions.signoutRequest, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Root);
