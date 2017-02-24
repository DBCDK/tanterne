import React from 'react';

export const Layout = (props) => {
  const {className, children, ...rest} = props;
  console.log(rest, children);
  return(
    <div className={className}>
      {children.map(child => React.cloneElement(child, rest))}
    </div>
  );
};