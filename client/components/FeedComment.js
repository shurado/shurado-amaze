import React from 'react';
import Image from './Image';

import { humanReadableTimeDiff } from 'utils';

const FeedComment = ({ text, user, createdAt }) => {
  return (
    <div className="feed-comment">
      <Image 
        src={user.avatar_url.facebook || user.avatar_url.google }
        size="40x40"
      />
      <p>
        { text }
      </p>
      <time>{humanReadableTimeDiff(new Date(createdAt))}</time>
    </div>
  )
}

export default FeedComment;
