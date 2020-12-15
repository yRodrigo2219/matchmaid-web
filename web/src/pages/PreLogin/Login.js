import React, { Component } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import WhiteThing from '../../components/WhiteThing';
import NavButton from '../../components/NavButton';

import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  doLogin() {
    let login = {
      email: this.state.email,
      password: this.state.password
    };

    fetch('http://localhost:3333/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login)
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log(res)
        if (res.error || res.err) {
          alert('Erro no Login!')
        } else {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('isMaid', res.isMaid);
          localStorage.setItem('clientId', res.clientId);
          localStorage.setItem('userInfo', JSON.stringify(res.user));
          this.props.login();
        }

      })
  }

  render() {
    return (
      <div className='content login'>
        <WhiteThing className='shadow'>
          <div className='cadastro'>
            <Button to='/cadastro' name='Fazer Cadastro' />
          </div>
          <div className='inputs'>
            <Input name='Email' type='text' onChange={this.handleInputChange} id='email' value={this.state.email} maxLength={50} />
            <Input name='Senha' type='password' onChange={this.handleInputChange} id='password' value={this.state.password} maxLength={20} />
            <NavButton to='/login' name='Esqueci minha senha' />
          </div>
          <div className='login'>
            <Button to='/login' name='Entrar' onClick={this.doLogin} />
          </div>
        </WhiteThing>
      </div>
    );
  }
}