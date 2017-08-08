import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { compose, bindActionCreators } from 'redux';
import { graphql, gql } from 'react-apollo';

import UserSidebarInfo from '../components/UserSidebarInfo';
import Feed from '../components/Feed';
import CreateFeedContainer from '../containers/CreateFeedContainer';

import { fetchURLRequest } from '../stores/Services/modules';
import { createFeedRequest } from '../stores/Feed/modules';

export class TimelineFeedPage extends React.Component {

  constructor(props) {
    super(props);
  }

  onLoadMoreFeeds() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {
    
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
    const { loading, info } = this.props.data;
    const { profile, isLoggedIn } = this.props.user;

    if (!isLoggedIn) {
      return (<Redirect to="/user/login" />);
    }

    return (
      <div className="container">
        <div className="user-info-container">
          { this.props.user.isFetching
            ? 'loading'
            : <UserSidebarInfo isLoading={this.props.data.isLoading} {...profile} {...info} /> }
        </div>
        <div className="timelinefeeds container sidebar-offset">
          <CreateFeedContainer
            loadLastestFeed={this.props.loadLastestFeed}
            createFeedRequest={this.props.createFeedRequest}
          />
          { loading ? 'loading...' :  this.renderFeeds() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    feed: state.feed,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchURLRequest: bindActionCreators(fetchURLRequest, dispatch),
    createFeedRequest: bindActionCreators(createFeedRequest, dispatch),
  }
}

const FEED_FRAGMENT = gql`
  fragment TimelineFeed on feedType {
    id
    caption
    createdAt
    updatedAt
    comment_count
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
    commenter_ids
    comments {
      ... on commentType {
        text
        user_id
        user {
          nickname
          username
          avatar_url {
            facebook
            google
          }
        }
        createdAt
      }
    }
  }
`


const timelineFeedQuery = gql`
  query TimelineFeedsQuery($userId: ID!) {
    info(userId: $userId) {
      feed_count
      suggestion_count
    }
    feeds {
      ...TimelineFeed
    }
  }
  ${FEED_FRAGMENT}
`;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(timelineFeedQuery, {
    options: (props) => ({ 
      variables: { userId: props.user.userId },
    }),
    props: ({ data }) => {
      return {
        data,
        loadLastestFeed(feedId) {
          return data.fetchMore({
            query: gql`
              query feed($id: ID!) {
                feed(id: $id) {
                  ...TimelineFeed
                }
              }
              ${FEED_FRAGMENT}
            `,
            variables: {
              id: feedId
            },
            updateQuery: (previousResult, { fetchMoreResult }) => ({
              ...previousResult,
              feeds: [fetchMoreResult.feed, ...previousResult.feeds]
            })
          });
        },
        loadMoreFeeds(offset, limit = 20) {
          return data.fetchMore({
            query: gql`
              query Feeds($offset: Int!) {
                feeds(offset: $offset) {
                  ...TimelineFeed
                }
              }
              ${FEED_FRAGMENT}
            `,
            variables: {
              offset: data.feeds.length
            },
            updateQuery: (previousResult, { fetchMoreResult }) => ({
              ...previousResult,
              feeds: [...previousResult.feeds, ...fetchMoreResult.feeds]
            })
          })
        }
      }   
    }
  }),
)(TimelineFeedPage);
