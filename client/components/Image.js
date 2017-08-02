import React from 'react';
import { setPropTypes, defaultProps, compose } from 'recompose';
import PropTypes from 'prop-types';

const Image = ({ src, size, style, className, alt }) => {
  const [width, height] = size.split('x');
  if (!src) {
    return null;
  }
  return (
    <img 
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
    size: ''
  })
)

export default enhance(Image);
