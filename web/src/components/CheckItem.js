import React from 'react';

export default function CheckItem(props) {
  return (
    <label><li>{props.label}<input type="checkbox" name={props.id} onChange={props.onClick} checked={props.checked} /></li></label>
  );
}