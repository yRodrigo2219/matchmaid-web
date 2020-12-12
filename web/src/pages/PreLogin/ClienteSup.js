import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Input from '../../components/Input';
import NavButton from '../../components/NavButton';
import WhiteThing from '../../components/WhiteThing';
import PopupMap from '../../components/PopupMap';
import Button from '../../components/Button';

import { isValid } from '../../Constants';

export default class ClienteSup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapVisible: false,
      // signup
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
    this.closeMap = this.closeMap.bind(this);
    this.openMap = this.openMap.bind(this);
    this.getLonglat = this.getLonglat.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  badInputs = () => {
    let message = '';

    let keys = ['cpf', 'email', 'password', 'name', 'cep', 'uf', 'street', 'city', 'houseNumber', 'neighborhood'];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (!isValid[key].regex.test(this.state[key]))
        return [true, isValid[key].message];
    }

    return [false, message];
  }

  makeAccount() {
    let [isBad, message] = this.badInputs();
    if (isBad) {
      alert(message)
      return;
    }

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
        uf: this.state.uf.toUpperCase()
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

  closeMap() {
    this.setState({
      mapVisible: false
    });
  }

  openMap() {
    this.setState({
      mapVisible: true
    });
  }

  getLonglat([long, lat]) {
    this.setState({
      longitude: long,
      latitude: lat
    });
  }

  render() {
    return (
      <div className='content supsteps'>
        <span>Cadastro Cliente</span>
        <WhiteThing className='shadow'>
          <PopupMap visible={this.state.mapVisible} onClickAway={this.closeMap} onClick={this.getLonglat} />
          <BrowserRouter>
            <Switch>
              <Route path='/cadastro/cliente/2'>
                <div>
                  <div className='progression'>
                    <div></div>
                    <NavButton to='/cadastro/cliente/1' name='1' />
                    <NavButton to='/cadastro/cliente/2' name='2' className='active' />
                    <div></div>
                  </div>
                  <Input name='Rua' type='text' onChange={this.handleInputChange} id='street' value={this.state.street} maxLength={150} regex={isValid.street.regex} tooltip={isValid.street.tip} />
                  <div className='half'>
                    <Input name='Bairro' type='text' onChange={this.handleInputChange} id='neighborhood' value={this.state.neighborhood} maxLength={50} regex={isValid.neighborhood.regex} tooltip={isValid.neighborhood.tip} />
                    <Button to='/cadastro/cliente/2' name='Localização Precisa' onClick={this.openMap} />
                  </div>
                  <div className='half'>
                    <Input name='Número' type='text' onChange={this.handleInputChange} id='houseNumber' value={this.state.houseNumber} maxLength={5} regex={isValid.houseNumber.regex} tooltip={isValid.houseNumber.tip} />
                    <Input name='Estado' type='text' onChange={this.handleInputChange} id='uf' value={this.state.uf} maxLength={2} regex={isValid.uf.regex} tooltip={isValid.uf.tip} />
                  </div>
                  <div className='half'>
                    <Input name='Cidade' type='text' onChange={this.handleInputChange} id='city' value={this.state.city} maxLength={50} regex={isValid.city.regex} tooltip={isValid.city.tip} />
                    <Input name='CEP' type='text' onChange={this.handleInputChange} id='cep' value={this.state.cep} maxLength={9} regex={isValid.cep.regex} tooltip={isValid.cep.tip} />
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
                    <div></div>
                    <NavButton to='/cadastro/cliente/1' name='1' className='active' />
                    <NavButton to='/cadastro/cliente/2' name='2' />
                    <div></div>
                  </div>
                  <Input name='Email' type='text' onChange={this.handleInputChange} id='email' value={this.state.email} maxLength={50} regex={isValid.email.regex} tooltip={isValid.email.tip} />
                  <Input name='Nome' type='text' onChange={this.handleInputChange} id='name' value={this.state.name} maxLength={50} regex={isValid.name.regex} tooltip={isValid.name.tip} />
                  <Input name='Senha' type='password' onChange={this.handleInputChange} id='password' value={this.state.password} maxLength={20} regex={isValid.password.regex} tooltip={isValid.password.tip} />
                  <div className='half'>
                    <Input name='Celular' type='text' onChange={this.handleInputChange} id='phoneNumber' value={this.state.phoneNumber} maxLength={17} />
                    <Input name='CPF' type='text' onChange={this.handleInputChange} id='cpf' value={this.state.cpf} maxLength={14} regex={isValid.cpf.regex} tooltip={isValid.cpf.tip} />
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
      </div >
    );
  }
}