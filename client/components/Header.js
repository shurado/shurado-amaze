import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router-dom';

import routes from 'constants/routes'; // eslint-disable-line import/extensions
import styles from 'components/Header.scss';
import Image from './Image';


class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  renderUserAction() {
    const bindSignout = () => () => this.props.signoutRequest();
    return (
      <div styleName="user-action">
        <span>通知</span>
        <Link to={routes.getUserProfile(this.context.userId)}>個人檔案</Link>
        <Link to={routes.TIMELINE}>動態牆</Link>
        <span onClick={bindSignout()}>登出</span>
      </div>
    )
  }

  render() {
    return (
      <nav styleName="Header">
        <div>
          {this.context.isLoggedIn ? this.renderUserAction() : <Link to='/user/login'>登入</Link> }
        </div>

        <div className="logo">
          <Link to="/">
            <Image
              src="/images/logo-icon.png"
              size="40x40"
            />
          </Link>
        </div>
        
      </nav>
    );
  }
}

Header.contextTypes = {
  jwtToken: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  userId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default CSSModules(Header, styles);
