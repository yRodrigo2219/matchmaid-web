import React from 'react';
import Button from '../../components/Button';

import './Header.css';

export default function Header() {
  return (
    <div className='header'>
      <div className='h-home'>
        <Button to='/' name='Inicio' />
      </div>
      <div className='h-seja'>
        <Button to='/' name='Seja uma Maid!' />
      </div>
      <div className='h-extra'>
        <Button to='/login' name='Login' />
        <Button to='/cadastro' name='Cadastro' />
      </div>
    </div >
  );
}