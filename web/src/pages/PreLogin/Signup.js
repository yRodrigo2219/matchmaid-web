import React, { Component } from 'react';
import Button from '../../components/Button';
import WhiteThing from '../../components/WhiteThing';

import blonde from '../../Images/imgs/blonde.jpg';
import maid from '../../Images/imgs/maid.jpg';

import './Signup.css';

export default class Signup extends Component {
  render() {
    return (
      <div className='content signup'>
        <span>Escolha Seu Perfil</span>
        <div className='perfil'>
          <div></div>
          <WhiteThing className='shadow'>
            <div></div>
            <img src={blonde} alt='blonde' />
            <Button to='/cadastro/cliente' name='Cliente' />
          </WhiteThing>
          <WhiteThing className='shadow'>
            <div></div>
            <img src={maid} alt='maid' />
            <Button to='/cadastro/maid' name='Maid' />
          </WhiteThing>
          <div></div>
        </div>
      </div>
    );
  }
}