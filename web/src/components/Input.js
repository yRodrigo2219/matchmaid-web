import React, { useEffect, useState } from 'react';

export default function Input(props) {
  let uuid = Math.random().toString();
  let [show, setShow] = useState(0);

  useEffect(() => {
    let label = document.getElementById(uuid);
    let input = label.getElementsByTagName('input')[0];
    if (input != null) {
      if ((input.type === 'text' || input.type === 'password') && !!props.regex) {
        if (props.regex.test(input.value) && input.classList.contains('errado')) {
          input.classList.remove('errado');
          setShow(false);
        } else if (!props.regex.test(input.value) && input.value !== '') {
          input.classList.add('errado');
          setShow(true);
        }
        if (input.value === '' && input.classList.contains('errado')) {
          input.classList.remove('errado');
          setShow(false);
        }
      }
    }
  }, [uuid, props.regex]);

  return (
    <label className='input-label' id={uuid}>
      {show ? <span className='tooltiptext'>{props.tooltip}</span> : ''}
      {props.name}
      <input type={props.type} className='input-space' name={props.id} onChange={props.onChange} value={props.value} accept={props.accept} maxLength={props.maxLength} />
    </label>
  );
}