import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Button(props) {
  return (
    <NavLink exact={props.exact} className='btn' to={props.to} activeClassName='btn-active' onClick={props.onClick}>
      {props.name}
    </NavLink>
  );
}