import React from 'react';
import NavButton from '../../components/NavButton';

import logo from '../../Images/imgs/logo.png';

import './Header.css';

export default function Header() {
  return (
    <div className='header'>
      <div className='h-home'>
        <div></div>
        <NavButton to='/' name={<img src={logo} alt='Inicio' />} />
      </div>
      <div className='h-seja'>
        <NavButton to='/cadastro/maid' name='Seja uma Maid!' />
      </div>
      <div className='h-extra'>
        <NavButton to='/login' name='Login' />
        <NavButton to='/cadastro' name='Cadastro' />
      </div>
    </div >
  );
}