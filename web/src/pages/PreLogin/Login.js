import React from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';

import './Login.css';

export default function Login() {
  return (
    <div className='content login'>
      <div className='container'>
        <div className='cadastro'>
          <Button to='/cadastro' name='Cadastrar' />
        </div>
        <div className='inputs'>
          <Input name='Email' type='text' />
          <Input name='Senha' type='text' />
          <Button to='/login' name='Esqueci minha senha' />
        </div>
        <div className='login'>
          <Button to='/login' name='Entrar' />
        </div>
      </div>
    </div>
  );
}