import React from 'react';

export default function Input(props) {
  return (
    <label className='input-label'>
      {props.name}
      <input type={props.type} className='input-space' />
    </label>
  );
}