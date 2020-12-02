import React from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import WhiteThing from '../../components/WhiteThing';
import NavButton from '../../components/NavButton';

import './Login.css';

export default function Login() {
  return (
    <div className='content login'>
      <WhiteThing className='shadow'>
        <div className='cadastro'>
          <Button to='/cadastro' name='Cadastrar' />
        </div>
        <div className='inputs'>
          <Input name='Email' type='text' />
          <Input name='Senha' type='text' />
          <NavButton to='/login' name='Esqueci minha senha' />
        </div>
        <div className='login'>
          <Button to='/login' name='Entrar' />
        </div>
      </WhiteThing>
    </div>
  );
}