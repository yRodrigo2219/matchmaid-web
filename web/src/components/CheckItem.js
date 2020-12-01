import React from 'react';

export default function CheckItem(props) {
  return (
    <label><li>{props.label}<input type="checkbox" /></li></label>
  );
}