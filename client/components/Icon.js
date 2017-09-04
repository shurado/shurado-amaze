import React from 'react';
import cx from 'classnames';
import CSSModules from 'react-css-modules';

import styles from 'components/Icon.scss';

const Icon = ({ color, size = 'normal', name, classNames }) => {
  return (
    <div style={{ display: 'inline-block' }}>
      <svg
        stroke={color}
        className={cx(name, classNames)}
        styleName="Icon"
      >
        <use xlinkHref={`#${name}`} />
      </svg>
    </div>
  )
}

export default CSSModules(Icon, styles);
