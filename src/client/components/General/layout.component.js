import React from 'react';

export const Layout = (props) => {
  const {className, children, ...rest} = props;
  return (
    <div className={className}>
      {children.map(child => React.cloneElement(child, rest))}
    </div>
  );
};
