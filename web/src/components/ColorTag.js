import React from 'react';

export default function ColorTag(props) {
  return (
    <span className={`tag ${props.color}`}>
      {props.children}
    </span>
  );
}