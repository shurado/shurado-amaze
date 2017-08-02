import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import { pure, compose, setPropTypes } from 'recompose';

import styles from 'components/UserSidebarInfo.scss';
import Image from './Image';

const UserSidebarInfo = ({ avatar_url, nickname, username, website, suggestions, feeds, rank }) => {
  return (
    <div styleName="container">
      <div styleName="avatar">
        <Image src={avatar_url.facebook || avatar_url.google } />
        <span>{username}</span>
      </div>
      <div styleName="user-summary">
        <div styleName="user-summary__item" className="feeds">
          <dt>日記/動態</dt>
          <dd>{feeds}</dd>
        </div>
        <div styleName="user-summary__item" className="suggestions">
          <dt>提出建議</dt>
          <dd>{suggestions}</dd>
        </div>
        <div styleName="user-summary__item" className="rank">
          <dt>排名</dt>
          <dd>{rank}</dd>
        </div>
      </div>
    </div>
  )
};

const enhance = compose(
  setPropTypes({
    avatar_url: PropTypes.shape({
      facebook: PropTypes.string,
      google: PropTypes.string
    }),
  }),
  pure
);


export default enhance(CSSModules(UserSidebarInfo, styles));
