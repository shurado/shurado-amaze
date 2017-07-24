import React from 'react';
import { connect } from 'react-redux';

class Root extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>hello, world</p>
      </div>
    );
  }
}

export default connect()(Root);
