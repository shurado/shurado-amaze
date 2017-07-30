import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';

class Root extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        s
        <Header />
      </div>
    );
  }
}

export default connect()(Root);
