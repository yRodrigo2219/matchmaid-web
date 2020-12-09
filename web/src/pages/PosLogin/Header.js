import React from 'react';
import NavButton from '../../components/NavButton';
import { useHistory } from "react-router-dom";

import './Header.css';

export default function Header(props) {
  let history = useHistory();

  // reload full escroto pra poder trocar para o seu perfil, mesmo estando em um perfil de empregada
  function handlePerfil() {
    localStorage.setItem('owner', 'true')
    history.push('/perfil');
    history.go(0);
  }

  return (
    <div className='header'>
      <div className='h-home'>
        <div></div>
        <NavButton to='/' name='Inicio' />
      </div>
      <div className='h-seja'>

      </div>
      <div className='h-extra'>
        <NavButton to='/perfil' name='Perfil' onClick={handlePerfil} />
        <NavButton to='/logout' name='Sair' onClick={props.logout} />
      </div>
    </div >
  );
}