import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Input from '../../components/Input';
import NavButton from '../../components/NavButton';
import WhiteThing from '../../components/WhiteThing';
import DropDownCheck from '../../components/DropDownCheck';
import CheckItem from '../../components/CheckItem';
import Slider from '../../components/Slider';

import './SignupSteps.css';

export default class MaidSup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // maid
      cpf: '',
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      status: false,
      pricePerHour: 20,
      // local
      latitude: 0.0,
      longitude: 0.0,
      street: '',
      houseNumber: '',
      neighborhood: '',
      city: '',
      cep: '',
      uf: '',
      // dias
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
      // periodo
      morning: false,
      afternoon: false,
      night: false,
      // servico
      nanny: false,
      careHouse: false,
      cleanHouse: false,
      ironClothes: false,
      washClothes: false,
      washDishes: false,
      cook: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.makeAccount = this.makeAccount.bind(this);
    this.handleInputCheck = this.handleInputCheck.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleInputCheck(e) {
    this.setState({
      [e.target.name]: e.target.checked
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
      pricePerHour: parseInt(this.state.pricePerHour),
      status: false,
      numberOfVisits: 0,
      birthDate: '1999-06-26T18:25:43',
      bibliography: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
      image: 'image',
      location: {
        maidCpf: this.state.cpf,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        street: this.state.street,
        houseNumber: this.state.houseNumber,
        complement: 'complemento',
        neighborhood: this.state.neighborhood,
        city: this.state.city,
        cep: this.state.cep,
        uf: this.state.uf
      },
      disponibleDays: {
        maidCpf: this.state.cpf,
        monday: this.state.monday,
        tuesday: this.state.tuesday,
        wednesday: this.state.wednesday,
        thursday: this.state.thursday,
        friday: this.state.friday,
        saturday: this.state.saturday,
        sunday: this.state.sunday
      },
      disponiblePeriod: {
        maidCpf: this.state.cpf,
        morning: this.state.morning,
        afternoon: this.state.afternoon,
        night: this.state.night
      },
      services: {
        maidCpf: this.state.cpf,
        nanny: this.state.nanny,
        careHouse: this.state.careHouse,
        cleanHouse: this.state.cleanHouse,
        ironClothes: this.state.ironClothes,
        washClothes: this.state.washClothes,
        washDishes: this.state.washDishes,
        cook: this.state.cook
      }
    };

    fetch('http://localhost:3333/create/maid', {
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
        <span>Cadastro Maid</span>
        <WhiteThing className='shadow'>
          <BrowserRouter>
            <Switch>
              <Route path='/cadastro/maid/3'>
                <div>
                  <div className='progression'>
                    <div></div>
                    <NavButton to='/cadastro/maid/1' name='1' />
                    <NavButton to='/cadastro/maid/2' name='2' />
                    <NavButton to='/cadastro/maid/3' name='3' className='active' />
                    <div></div>
                  </div>
                  <div className='dropdowns'>
                    <DropDownCheck id='cadastro-dias' label='Dias disponíveis'>
                      <CheckItem label='Segunda' id='monday' checked={this.state.monday} onClick={this.handleInputCheck} />
                      <CheckItem label='Terça' id='tuesday' checked={this.state.tuesday} onClick={this.handleInputCheck} />
                      <CheckItem label='Quarta' id='wednesday' checked={this.state.wednesday} onClick={this.handleInputCheck} />
                      <CheckItem label='Quinta' id='thursday' checked={this.state.thursday} onClick={this.handleInputCheck} />
                      <CheckItem label='Sexta' id='friday' checked={this.state.friday} onClick={this.handleInputCheck} />
                      <CheckItem label='Sabado' id='saturday' checked={this.state.saturday} onClick={this.handleInputCheck} />
                      <CheckItem label='Domingo' id='sunday' checked={this.state.sunday} onClick={this.handleInputCheck} />
                    </DropDownCheck>
                    <DropDownCheck id='cadastro-periodo' label='Períodos disponíveis'>
                      <CheckItem label='Manhã' id='morning' checked={this.state.morning} onClick={this.handleInputCheck} />
                      <CheckItem label='Tarde' id='afternoon' checked={this.state.afternoon} onClick={this.handleInputCheck} />
                      <CheckItem label='Noite' id='night' checked={this.state.night} onClick={this.handleInputCheck} />
                    </DropDownCheck>
                    <DropDownCheck id='cadastro-servico' label='Serviços prestados'>
                      <CheckItem label='Babá' id='nanny' checked={this.state.nanny} onClick={this.handleInputCheck} />
                      <CheckItem label='Cuidar Casa' id='careHouse' checked={this.state.careHouse} onClick={this.handleInputCheck} />
                      <CheckItem label='Limpar Casa' id='cleanHouse' checked={this.state.cleanHouse} onClick={this.handleInputCheck} />
                      <CheckItem label='Passar Roupas' id='ironClothes' checked={this.state.ironClothes} onClick={this.handleInputCheck} />
                      <CheckItem label='Lavar Roupas' id='washClothes' checked={this.state.washClothes} onClick={this.handleInputCheck} />
                      <CheckItem label='Lavar Louça' id='washDishes' checked={this.state.washDishes} onClick={this.handleInputCheck} />
                      <CheckItem label='Cozinhar' id='cook' checked={this.state.cook} onClick={this.handleInputCheck} />
                    </DropDownCheck>
                  </div>
                  <div className='cadastro-preco'>
                    <div>
                      <span>Defina o preço do seu serviço por hora</span>
                      <Slider onChange={this.handleInputChange} value={this.state.pricePerHour} id='pricePerHour' />
                      <span>R$ {this.state.pricePerHour},00</span>
                    </div>
                  </div>

                </div>
                <div className='avanco'>
                  <NavButton to='/cadastro/maid/2' name='<' />
                  <NavButton to='/cadastro/maid/3' name='Finalizar' onClick={this.makeAccount} />
                </div>
              </Route>
              <Route path='/cadastro/maid/2'>
                <div>
                  <div className='progression'>
                    <div></div>
                    <NavButton to='/cadastro/maid/1' name='1' />
                    <NavButton to='/cadastro/maid/2' name='2' className='active' />
                    <NavButton to='/cadastro/maid/3' name='3' />
                    <div></div>
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
                  <NavButton to='/cadastro/maid/1' name='<' />
                  <NavButton to='/cadastro/maid/3' name='>' />
                </div>
              </Route>
              <Route path='/cadastro/maid'>
                <div>
                  <div className='progression'>
                    <div></div>
                    <NavButton to='/cadastro/maid/1' name='1' className='active' />
                    <NavButton to='/cadastro/maid/2' name='2' />
                    <NavButton to='/cadastro/maid/3' name='3' />
                    <div></div>
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
                  <NavButton to='/cadastro/maid' name='' />
                  <NavButton to='/cadastro/maid/2' name='>' />
                </div>
              </Route>
            </Switch>
          </BrowserRouter>
        </WhiteThing>
      </div>
    );
  }
}