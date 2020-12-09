import React, { Component } from "react";
import WhiteThing from "../../components/WhiteThing";
import NavButton from "../../components/NavButton";
import Input from "../../components/Input";
import Button from "../../components/Button";
import DropDownCheck from '../../components/DropDownCheck';
import CheckItem from '../../components/CheckItem';
import ColorTag from '../../components/ColorTag';

import './Perfil.css';
import { Route, Switch } from "react-router-dom";

export default class Perfil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      perfil: null,
      owner: false,
      // user
      name: '',
      email: '',
      phoneNumber: '',
      bibliography: '',
      pricePerHour: 0,
      // location
      longitude: 0,
      latitude: 0,
      street: '',
      houseNumber: '',
      complement: '',
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
      // hora
      morning: false,
      afternoon: false,
      night: false,
      // serv
      nanny: false,
      careHouse: false,
      cleanHouse: false,
      ironClothes: false,
      washClothes: false,
      washDishes: false,
      cook: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    this.setState({ perfil: JSON.parse(localStorage.getItem('perfil')), owner: ('true' === localStorage.getItem('owner')) });

    // gambiarra pra ver se trocou de perfil visitante para perfil proprietario...
    // setInterval(() => this.setState({ perfil: JSON.parse(localStorage.getItem('perfil')), owner: ('true' === localStorage.getItem('owner')) }), 1000);
  }

  renderServices() {
    let s = this.state.perfil.services;

    return (
      <div className='servico'>
        <h2>Serviços</h2>
        {s.nanny ? <ColorTag color='cyan'>Babá</ColorTag> : ''}
        {s.cleanHouse ? <ColorTag color='red'>Limpa a Casa</ColorTag> : ''}
        {s.careHouse ? <ColorTag color='purple'>Cuida da Casa</ColorTag> : ''}
        {s.ironClothes ? <ColorTag color='pink'>Passa a Roupa</ColorTag> : ''}
        {s.washClothes ? <ColorTag color='purple'>Lava a Roupa</ColorTag> : ''}
        {s.washDishes ? <ColorTag color='pink'>Lava a Louça</ColorTag> : ''}
        {s.cook ? <ColorTag color='cyan'>Cozinha</ColorTag> : ''}
      </div>
    );
  }

  render() {
    return (
      <div className='content perfil-visi'>
        {
          this.state.perfil === null
            ?
            ''
            :
            <div>
              <div className='p1'>
                <div className='foto'>
                  <img src='https://image.flaticon.com/icons/png/128/51/51256.png?ga=GA1.2.1391951570.1603459063' alt='Foto'></img>
                  <span>{this.state.perfil.maid.name}</span>
                </div>
                <div className='categ'>
                  <NavButton to='/perfil' name='Perfil' />
                  {
                    this.state.owner ?
                      <NavButton to='/perfil/cfg' name='Configurações' />
                      : ''
                  }
                </div>
              </div>
              <Switch>
                <Route path='/perfil/cfg'>
                  <div className='p2 h'>
                    <WhiteThing className='endereco'>
                      <h2>Alterar Endereço</h2>
                      <Input name='Rua' type='text' onChange={this.handleInputChange} id='street' value={this.state.street} />
                      <Input name='Bairro' type='text' onChange={this.handleInputChange} id='neighborhood' value={this.state.neighborhood} />
                      <Input name='Número' type='text' onChange={this.handleInputChange} id='houseNumber' value={this.state.houseNumber} />
                      <Input name='Estado' type='text' onChange={this.handleInputChange} id='uf' value={this.state.uf} />
                      <Input name='Cidade' type='text' onChange={this.handleInputChange} id='city' value={this.state.city} />
                      <Input name='CEP' type='text' onChange={this.handleInputChange} id='cep' value={this.state.cep} />
                      <Button name='Confirmar Alterações' to='/perfil/cfg' />
                    </WhiteThing>
                    <WhiteThing className='usuario'>
                      <h2>Alterar Usuário</h2>
                      <Input name='Email' type='email' onChange={this.handleInputChange} id='email' value={this.state.email} />
                      <Input name='Nome' type='text' onChange={this.handleInputChange} id='name' value={this.state.name} />
                      <Input name='Senha' type='password' onChange={this.handleInputChange} id='password' value={this.state.password} />
                      <Input name='Celular' type='text' onChange={this.handleInputChange} id='phoneNumber' value={this.state.phoneNumber} />
                      <Button name='Confirmar Alterações' to='/perfil/cfg' />
                    </WhiteThing>
                    <WhiteThing className='servicos'>
                      <h2>Alterar Dias e Serviços</h2>
                      <DropDownCheck id='alterar-dias' label='Dias disponíveis'>
                        <CheckItem label='Segunda' />
                        <CheckItem label='Terça' />
                        <CheckItem label='Quarta' />
                        <CheckItem label='Quinta' />
                        <CheckItem label='Sexta' />
                        <CheckItem label='Sabado' />
                        <CheckItem label='Domingo' />
                      </DropDownCheck>
                      <DropDownCheck id='alterar-periodo' label='Períodos disponíveis'>
                        <CheckItem label='Dia' />
                        <CheckItem label='Tarde' />
                        <CheckItem label='Noite' />
                      </DropDownCheck>
                      <DropDownCheck id='alterar-servico' label='Serviços prestados'>
                        <CheckItem label='Babá' />
                        <CheckItem label='Limpar Casa' />
                        <CheckItem label='Cozinhar' />
                      </DropDownCheck>
                      <Button name='Confirmar Alterações' to='/perfil/cfg' />
                    </WhiteThing>
                  </div>
                </Route>
                <Route path='/perfil'>
                  <div className='p2'>
                    <WhiteThing className='contatos'>
                      <h2>Contatos</h2>
                      <h4>Email: {this.state.perfil.maid.email}</h4>
                      <h4>Celular: {this.state.perfil.maid.phoneNumber}</h4>
                    </WhiteThing>
                    <WhiteThing className='interacoes'>
                      <h2>Últimas Interações</h2>
                    </WhiteThing>
                    <WhiteThing className='avaliacoes'>
                      <h2>Últimas Avaliações</h2>
                    </WhiteThing>
                  </div>
                </Route>
              </Switch>
              <div className='p3'>
                <div className='biografia'>
                  <h2>Biografia</h2>
                  <span>{this.state.perfil.maid.bibliography}</span>
                </div>
                <div className='local'>
                  <h2>Localização</h2>
                  <span>{`${this.state.perfil.locations.city}, ${this.state.perfil.locations.uf}`}</span>
                </div>
                {this.renderServices()}
              </div>
            </div>
        }

      </div>
    );
  }
}