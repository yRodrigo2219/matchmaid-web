import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Button(props) {
  return (
    <NavLink exact={props.exact} className={'nav ' + (props.className || '')} to={props.to} activeClassName='nav-active' onClick={props.onClick}>
      {props.name}
    </NavLink>
  );
}