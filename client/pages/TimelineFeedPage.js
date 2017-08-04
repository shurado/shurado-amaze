import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { graphql, gql } from 'react-apollo';
import Cookie from 'js-cookie';

import UserSidebarInfo from '../components/UserSidebarInfo';
import Feed from '../components/Feed';
import CreateFeedEditor from '../components/editors/CreateFeedEditor';
import Image from '../components/Image';

import { fetchURLRequest } from '../stores/Services/modules';

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
    const { loading, feeds, info } = this.props.data;
    const { profile } = this.props.user;
    return (
      <div className="container">
        <div className="user-info-container">
          { this.props.user.isFetching 
            ? 'loading' 
            : <UserSidebarInfo isLoading={this.props.data.isLoading} {...profile} {...info} /> }
        </div>
        <div className="timelinefeeds container sidebar-offset">
          <CreateFeedEditor>
            <div>
              <Image 
                src={profile.avatar_url && profile.avatar_url.facebook}
                shape="circle"
              />
              <span style={{verticalAlign: 'top', marginLeft: '10px'}}>{profile.nickname}</span>
            </div>
          </CreateFeedEditor>
          { loading ? 'loading...' :  this.renderFeeds() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchURLRequest: bindActionCreators(fetchURLRequest, dispatch)
  }
}

const timelineFeedQuery = gql`
  query TimelineFeedsQuery($userId: ID!) {
    info(userId: $userId) {
      feed_count
      suggestion_count
    }
    feeds {
      ... on feedType {
        id
        caption
        createdAt
        updatedAt
        comment_count
        comments {
          ... on commentType {
            text
            user_id
            createdAt
          }
        }
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
  }
`;
export default compose(
  graphql(timelineFeedQuery, {
    options: (props) => ({ variables: { userId: Cookie.get('uid') } })
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(TimelineFeedPage);
