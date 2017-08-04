import React from 'react';
import { setPropTypes, defaultProps, compose } from 'recompose';
import PropTypes from 'prop-types';

const styles = {
  circle: {
    borderRadius: '50%'
  }
}

const Image = ({ src, size, style, className, alt, shape }) => {
  const [width, height] = size.split('x');
  if (!src) {
    return null;
  }
  return (
    <img
      style={shape && shape === 'circle' ? styles.circle : {}}
      src={src}
      width={width}
      height={height}
      className={className}
      alt={alt}
    />
  )
};

const enhance = compose(
  setPropTypes({
    size: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    alt: PropTypes.string
  }),
  defaultProps({
    size: '',
    shape: {}
  })
)

export default enhance(Image);
