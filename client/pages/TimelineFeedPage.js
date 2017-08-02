import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { graphql, gql } from 'react-apollo';

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
          <UserSidebarInfo {...this.props.user.profile} />
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

export default compose(graphql(gql`
  query TimelineFeedsQuery {
    feeds {
      caption
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
`),
 connect(mapStateToProps)
)(TimelineFeedPage);
