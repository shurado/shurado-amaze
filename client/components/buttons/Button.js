import React from 'react';
import cx from 'classnames';

const Button = ({ href, text, className, onClick }) => {
  return (
    <button 
      className={cx(className)}
      onClick={onClick}
    >{text}</button>
  )
};

export default Button;
