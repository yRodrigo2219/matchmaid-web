import React, { Component } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import WhiteThing from '../../components/WhiteThing';
import NavButton from '../../components/NavButton';

import { isValid } from '../../Constants';

import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className='content login'>
        <WhiteThing className='shadow'>
          <div className='cadastro'>
            <Button to='/cadastro' name='Fazer Cadastro' />
          </div>
          <div className='inputs'>
            <Input name='Email' type='text' onChange={this.handleInputChange} id='email' value={this.state.email} maxLength={50} regex={isValid.email.regex} tooltip={isValid.email.tip} />
            <Input name='Senha' type='password' onChange={this.handleInputChange} id='password' value={this.state.password} maxLength={20} regex={isValid.password.regex} tooltip={isValid.password.tip} />
            <NavButton to='/login' name='Esqueci minha senha' />
          </div>
          <div className='login'>
            <Button to='/login' name='Entrar' onClick={this.props.login} />
          </div>
        </WhiteThing>
      </div>
    );
  }
}