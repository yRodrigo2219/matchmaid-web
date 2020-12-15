import React from 'react';

export default function Slider(props) {
  return (
    <div className="slidecontainer">
      <input type="range" min={props.min || 1} max={props.max || 50} value={props.value} className="slider" id="myRange" onChange={props.onChange} name={props.id} />
    </div>
  );
}