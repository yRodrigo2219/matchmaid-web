import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Input from '../../components/Input';
import NavButton from '../../components/NavButton';
import WhiteThing from '../../components/WhiteThing';


export default class ClienteSup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpf: '',
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      latitude: 0.0,
      longitude: 0.0,
      street: '',
      houseNumber: '',
      complement: '',
      neighborhood: '',
      city: '',
      cep: '',
      uf: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.makeAccount = this.makeAccount.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  makeAccount() {
    // estrutura json para envio
    let user = {
      cpf: this.state.cpf,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
      birthDate: '1999-06-26T18:25:43',
      image: 'image',
      location: {
        clientCpf: this.state.cpf,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        street: this.state.street,
        houseNumber: this.state.houseNumber,
        complement: 'complemento',
        neighborhood: this.state.neighborhood,
        city: this.state.city,
        cep: this.state.cep,
        uf: this.state.uf
      }
    };

    fetch('http://localhost:3333/create/client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(JSON.stringify(res.message));
        } else {
          window.location.replace('/login');
          alert("Cadastro feito com Sucesso!");
        }
      });
  }

  render() {
    return (
      <div className='content supsteps'>
        <span>Cadastro Cliente</span>
        <WhiteThing className='shadow'>
          <BrowserRouter>
            <Switch>
              <Route path='/cadastro/cliente/2'>
                <div>
                  <div className='progression'>
                    <div>1</div>
                    <div>2</div>
                  </div>
                  <Input name='Rua' type='text' onChange={this.handleInputChange} id='street' value={this.state.street} />
                  <Input name='Bairro' type='text' onChange={this.handleInputChange} id='neighborhood' value={this.state.neighborhood} />
                  <div className='half'>
                    <Input name='Número' type='text' onChange={this.handleInputChange} id='houseNumber' value={this.state.houseNumber} />
                    <Input name='Estado' type='text' onChange={this.handleInputChange} id='uf' value={this.state.uf} />
                  </div>
                  <div className='half'>
                    <Input name='Cidade' type='text' onChange={this.handleInputChange} id='city' value={this.state.city} />
                    <Input name='CEP' type='text' onChange={this.handleInputChange} id='cep' value={this.state.cep} />
                  </div>
                </div>
                <div className='avanco'>
                  <NavButton to='/cadastro/cliente/1' name='<' />
                  <NavButton to='/cadastro/cliente' name='Finalizar' onClick={this.makeAccount} />
                </div>
              </Route>
              <Route path='/cadastro/cliente'>
                <div>
                  <div className='progression'>
                    <div>1</div>
                    <div>2</div>
                  </div>
                  <Input name='Email' type='email' onChange={this.handleInputChange} id='email' value={this.state.email} />
                  <Input name='Nome' type='text' onChange={this.handleInputChange} id='name' value={this.state.name} />
                  <Input name='Senha' type='password' onChange={this.handleInputChange} id='password' value={this.state.password} />
                  <div className='half'>
                    <Input name='Celular' type='text' onChange={this.handleInputChange} id='phoneNumber' value={this.state.phoneNumber} />
                    <Input name='CPF' type='text' onChange={this.handleInputChange} id='cpf' value={this.state.cpf} />
                  </div>
                </div>
                <div className='avanco'>
                  <NavButton to='/cadastro/cliente' name='' />
                  <NavButton to='/cadastro/cliente/2' name='>' />
                </div>
              </Route>
            </Switch>
          </BrowserRouter>
        </WhiteThing>
      </div>
    );
  }
}