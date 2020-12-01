import React, { Component } from 'react';
import Button from '../../components/Button';
import WhiteThing from '../../components/WhiteThing';

import './Signup.css';

export default class Signup extends Component {
  render() {
    return (
      <div className='content signup'>
        <span>Escolha Seu Perfil</span>
        <div className='perfil'>
          <WhiteThing className='shadow'>
            <span>temp</span>
            <Button to='/cadastro/cliente' name='Cliente' />
          </WhiteThing>
          <WhiteThing className='shadow'>
            <span>temp</span>
            <Button to='/cadastro/maid' name='Maid' />
          </WhiteThing>
        </div>
      </div>
    );
  }
}