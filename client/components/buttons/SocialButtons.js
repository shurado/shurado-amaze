import React from 'react';
import { defaultProps } from 'recompose';

import styles from 'components/Buttons.scss';

const SocialButtons = ({ type, onClick, href }) => (
  <a 
    href={href}
    className={styles['social-btn'] + ' ' + styles.fb}
  >
      使用 { type } 帳號登入
  </a>
)

export default defaultProps({
  type: 'facebook'
})(SocialButtons);
