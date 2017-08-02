import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { graphql, gql } from 'react-apollo';
import Cookie from 'js-cookie';

import UserSidebarInfo from '../components/UserSidebarInfo';


export class TimelineFeedPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { loading, feeds } = this.props.data;
    return (
      <div className="container">
        <div className="user-info-container">
          { this.props.user.isFetching 
            ? 'loading' 
            : <UserSidebarInfo isLoading={this.props.data.isLoading} {...this.props.user.profile} {...this.props.data.info} /> }
        </div>
        <div className="timlinefeeds">

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const timelineFeedQuery = gql`
  query TimelineFeedsQuery($userId: ID!) {
    info(userId: $userId) {
      feed_count
      suggestion_count
    }
    feeds {
      caption
      createdAt
      updatedAt
      image_url {
        normal
      }
      author {
        nickname
        username
        website
        avatar_url {
          google
          facebook
        }
      }
    }
  }
`;
export default compose(
  graphql(timelineFeedQuery, {
    options: (props) => ({ variables: { userId: Cookie.get('uid') } })
  }),
  connect(mapStateToProps)
)(TimelineFeedPage);
