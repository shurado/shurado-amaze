import React from 'react';
import { connect } from 'react-redux';
import { graphql, gql } from 'react-apollo';

function mapStateToProps(state) {
  return {

  };
}

export class TimelineFeedPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default graphql(gql`
  query TimelineFeedsQuery {
    feeds {
      caption
      image_url {
        normal
      }
      author {
        nickname
        username
      }
    }
  }
`)(TimelineFeedPage);
