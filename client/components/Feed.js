import styles from 'components/Feed.scss';
import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { humanReadableTimeDiff, simpleFormat, detectURL } from 'utils';
import { compose } from 'ramda';

import Image from './Image';

const formatText = compose(
  detectURL,
  simpleFormat,
);

class Feed extends React.PureComponent {

  constructor(props) {
    super(props);
  }
  
  unfoldComments() {

  }

  render() {
    const { 
      caption, image_url, 
      author, createdAt, updateAt
    } = this.props.feed;

    return (
      <div styleName="feed">
        <div styleName="feed-info">
          <Image shape="circle" src={author.avatar_url && author.avatar_url.facebook } />
          <span styleName="author-name">{author.nickname || author.username }</span>
          <time>{humanReadableTimeDiff(new Date(createdAt))}</time>
        </div>
        
        <div>
          <p dangerouslySetInnerHTML={{__html: formatText(caption)}}></p>
          <Image 
            src={image_url.normal || image_url.hd }
            alt={caption}
          />
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  feed: PropTypes.object.isRequired
}

export default CSSModules(Feed, styles);
