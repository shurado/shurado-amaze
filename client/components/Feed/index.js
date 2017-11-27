import styles from 'components/Feed.scss';
import { humanReadableTimeDiff, simpleFormat, detectURL } from 'utils';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import cx from 'classnames';
import { compose } from 'ramda';


import Image from './Image';
import FeedComment from './FeedComment';
import SpotNameDisplay from './SpotNameDisplay';

const INIT_COMMENT_COUNT = 3;

const formatText = compose(
  detectURL,
  simpleFormat,
);

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fold: false,
    }

    this.unfoldFeed = this.unfoldFeed.bind(this);
  }
  
  unfoldFeed() {
    this.setState({ fold: false });
  }

  componentDidMount() {
    if (this.props.feed.caption.length > 300) {
      this.setState({ fold: true });
    }
  }

  hasComment() {
    const { comments } = this.props.feed;
    return comments.length !== 0;
  }

  renderInitComments() {
    const { comments } = this.props.feed;

    return comments.map((comment, key) => <FeedComment key={key} {...comment} />);
  }

  renderSpot() {
    const { spot } = this.props.feed;
    if (spot) {
      return <span>在 {this.props.feed.spot.name}</span>
    }

    return null;
  }

  render() {
    const { 
      caption, image_url, comment_count,
      author, createdAt, spot
    } = this.props.feed;

    return (
      <div styleName="feed">
        <div styleName="feed-container">
          <div styleName="feed-info">
            <Image shape="circle" src={author.avatar_url && author.avatar_url.facebook } />
            <span styleName="author-name">{author.nickname || author.username }</span>
            <time>{humanReadableTimeDiff(new Date(createdAt))}</time>
            { spot 
              ? <SpotNameDisplay 
                name={spot.name}
                lat={spot.location.lat} 
                lng={spot.location.lng}
              />
              : null
            }
            
          </div>
          
          <div className={cx(styles['feed-entry'], this.state.fold ? styles['fold'] : '')}>
            <p dangerouslySetInnerHTML={{__html: formatText(caption)}}></p>
            <span onClick={this.unfoldFeed}>{this.state.fold ? '繼續閱讀...' : ''}</span>
            <Image 
              src={image_url && (image_url.normal || image_url.hd) }
              alt={caption}
            />
          </div>
        </div>

        <div>
          { comment_count === 0 
            ? <span>{comment_count} 則留言</span>
            : <span onClick={this.unfoldComments}>{comment_count} 則留言</span>
          }

        </div>

        { this.hasComment() 
          ? <div styleName="comments"> 
            { this.renderInitComments() }
            { comment_count > INIT_COMMENT_COUNT ? <span>查看更多留言...</span> : '' }
          </div> 
          : '' }
      </div>
    );
  }
}

Feed.propTypes = {
  feed: PropTypes.object.isRequired
}

export default CSSModules(Feed, styles);
