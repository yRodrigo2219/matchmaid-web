import React from 'react';
import NavButton from '../../components/NavButton';

import './Header.css';

export default function Header() {
  return (
    <div className='header'>
      <div className='h-home'>
        <div></div>
        <NavButton to='/' name='Inicio' />
      </div>
      <div className='h-seja'>
        
      </div>
      <div className='h-extra'>
        <NavButton to='/perfil' name='Perfil' />
        <NavButton to='/logout' name='Sair' />
      </div>
    </div >
  );
}