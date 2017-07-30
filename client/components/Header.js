import React from 'react';
import PropTypes from 'prop-types';

import style from './Header.scss';

console.log(style);
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }

  render() {
    return (
      <nav className="Headerss">
        
      </nav>
    );
  }
}

Header.contextTypes = {
  jwtToken: PropTypes.string
}
