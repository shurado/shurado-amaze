import React from 'react';
import PropTypes from 'prop-types';

import Image from './Image';

export default class Feed extends React.PureComponent {

  constructor(props) {
    super(props);
  }
  
  render() {
    const { 
      caption, image_url, 
      author, createdAt, updateAt 
    } = this.props.feed;

    return (
      <div>
        <Image src={author.avatar_url && author.avatar_url.facebook } />
        <span>{author.nickname || author.username }</span>
        <time>{createdAt}</time>
        <div>
          <p>{caption}</p>
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
