import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { graphql, gql } from 'react-apollo';
import Cookie from 'js-cookie';

import UserSidebarInfo from '../components/UserSidebarInfo';
import Feed from '../components/Feed';

export class TimelineFeedPage extends React.Component {

  constructor(props) {
    super(props);
  }

  renderFeeds() {
    const { feeds } = this.props.data;

    return feeds.map(feed => 
      <Feed 
        key={feed.id}
        feed={feed}
      />
    );
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
        <div className="timelinefeeds container sidebar-offset">
          { loading ? 'loading...' :  this.renderFeeds() }
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
      id
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
