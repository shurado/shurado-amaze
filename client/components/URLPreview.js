import React from 'react';
import Image from './Image';
import LinkTo from './LinkTo';

import styles from 'components/URLPreview.scss';


const URLPreview = (props) => {
  return (
    <div className={styles['URLPreview']}>
      <LinkTo 
        href={props['og:url']}
        target="_blank"
        rel="noopener nofollow"
      >
        <Image src={props['og:image']} />
        <h2>{props['og:title']}</h2>
        <p>{props['og:description']}</p>
      </LinkTo>
    </div>
  )
}

export default URLPreview;
