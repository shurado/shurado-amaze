import React from 'react';

const LinkTo = ({ title='', href, target, rel, children, ...rest }) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      {...rest}
    >
      { React.Children.count(children) > 0 ? children : title }
    </a>
  )
}

export default LinkTo;
