import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Button(props) {
  return (
    <NavLink exact={props.exact} className='nav' to={props.to} activeClassName='nav-active'>
      {props.name}
    </NavLink>
  );
}