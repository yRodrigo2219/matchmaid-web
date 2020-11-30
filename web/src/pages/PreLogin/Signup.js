import React, { Component } from 'react';
import Button from '../../components/Button';

import './Signup.css';

export default class Signup extends Component {
  render() {
    return (
      <div className='content signup'>
        <span>Escolha Seu Perfil</span>
        <div className='perfil'>
          <div className='container'>
            <span>temp</span>
            <Button to='/cadastro/cliente' name='Cliente' />
          </div>
          <div className='container'>
            <span>temp</span>
            <Button to='/cadastro/maid' name='Maid' />
          </div>
        </div>
      </div>
    );
  }
}