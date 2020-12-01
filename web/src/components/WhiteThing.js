import React from 'react';

export default function Button(props) {
  return (
    <div className={'whiteThing ' + props.className}>
      {props.children}
    </div>
  );
}