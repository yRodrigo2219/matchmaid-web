import React, { Component } from "react";
import WhiteThing from "../../components/WhiteThing";
import NavButton from "../../components/NavButton";
import Input from "../../components/Input";
import Button from "../../components/Button";
import DropDownCheck from '../../components/DropDownCheck';
import CheckItem from '../../components/CheckItem';
import ColorTag from '../../components/ColorTag';

import { isValid } from '../../Constants';

import './Perfil.css';
import { Route, Switch } from "react-router-dom";

export default class Perfil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // controle
      perfil: null,
      owner: false,
      imageFile: null,
      cpf: '',
      id: 1,
      // user
      name: '',
      email: '',
      phoneNumber: '',
      bibliography: '',
      pricePerHour: 0,
      image: '',
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
    this.updateLocal = this.updateLocal.bind(this);
    this.updateMaid = this.updateMaid.bind(this);
    this.updateDeS = this.updateDeS.bind(this);
    this.handleInputCheck = this.handleInputCheck.bind(this);
    this.handleInputImage = this.handleInputImage.bind(this);
  }

  verifyBase64() {
    let regex = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=|[A-Z0-9+/]{4})$/i;

    console.log(regex.test(this.state.image));
    regex.lastIndex = 0; // reseta a regex
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  updateLocal() {
    let local = {
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      street: this.state.street,
      houseNumber: this.state.houseNumber,
      complement: this.state.complement,
      neighborhood: this.state.neighborhood,
      city: this.state.city,
      cep: this.state.cep,
      uf: this.state.uf
    };

    fetch(`http://localhost:3333/update/maid/location/${this.state.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(local),
    })
      .then(res => res.json())
      .then(res => alert(JSON.stringify(res)))
  }

  updateMaid = async () => {
    let maid = {
      cpf: this.state.cpf,
      name: this.state.name,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      birthDate: "1999-06-26T03:00:00.000Z",
      status: false,
      bibliography: this.state.bibliography,
      pricePerHour: this.state.pricePerHour,
      numberOfVisits: 0,
      image: await this.getBase64(this.state.imageFile)
    };

    fetch(`http://localhost:3333/update/maid/${this.state.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(maid),
    })
      .then(res => res.json())
      .then(res => alert(JSON.stringify(res)))
  }

  updateDeS() {
    let dias = {
      monday: this.state.monday,
      tuesday: this.state.tuesday,
      wednesday: this.state.wednesday,
      thursday: this.state.thursday,
      friday: this.state.friday,
      saturday: this.state.saturday,
      sunday: this.state.sunday
    };

    let hora = {
      morning: this.state.morning,
      afternoon: this.state.afternoon,
      night: this.state.night
    };

    let serv = {
      nanny: this.state.nanny,
      careHouse: this.state.careHouse,
      cleanHouse: this.state.cleanHouse,
      ironClothes: this.state.ironClothes,
      washClothes: this.state.washClothes,
      washDishes: this.state.washDishes,
      cook: this.state.cook
    };

    fetch(`http://localhost:3333/update/maid/disponibleDays/${this.state.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dias),
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(res.message);
        } else {
          fetch(`http://localhost:3333/update/maid/disponiblePeriod/${this.state.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(hora),
          })
            .then(res => res.json())
            .then(res => {
              if (res.error) {
                alert(res.message);
              } else {
                fetch(`http://localhost:3333/update/maid/services/${this.state.id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(serv),
                })
                  .then(res => res.json())
                  .then(res => {
                    alert(JSON.stringify(res.message))
                  })
              }
            })
        }
      })
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleInputImage(e) {
    if (!e.target.files[0].type.includes('image/png') && !e.target.files[0].type.includes('image/jpeg') && !e.target.files[0].type.includes('image/jpg')) {
      e.target.value = '';
      alert("Tipo inválido");
    } else if (e.target.files[0].size > 2150000) {
      e.target.value = '';
      alert("Arquivo excede o tamanho maximo(2MB)")
    } else {
      this.setState({ imageFile: e.target.files[0] })
    }
  }

  handleInputCheck(e) {
    this.setState({
      [e.target.name]: e.target.checked
    });
  }

  componentDidMount() {
    this.setState({ perfil: JSON.parse(localStorage.getItem('perfil')), owner: ('true' === localStorage.getItem('owner')) });
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
                    <WhiteThing className='alterar-endereco'>
                      <h2>Alterar Endereço</h2>
                      <div className='cca'>
                        <Input name='Rua' type='text' onChange={this.handleInputChange} id='street' value={this.state.street} maxLength={150} regex={isValid.street.regex} tooltip={isValid.street.tip} />
                        <Input name='Bairro' type='text' onChange={this.handleInputChange} id='neighborhood' value={this.state.neighborhood} maxLength={50} regex={isValid.neighborhood.regex} tooltip={isValid.neighborhood.tip} />
                        <div className='half'>
                          <Input name='Número' type='text' onChange={this.handleInputChange} id='houseNumber' value={this.state.houseNumber} maxLength={5} regex={isValid.houseNumber.regex} tooltip={isValid.houseNumber.tip} />
                          <Input name='Estado' type='text' onChange={this.handleInputChange} id='uf' value={this.state.uf} maxLength={2} regex={isValid.uf.regex} tooltip={isValid.uf.tip} />
                        </div>
                        <div className='half'>
                          <Input name='Cidade' type='text' onChange={this.handleInputChange} id='city' value={this.state.city} maxLength={50} regex={isValid.city.regex} tooltip={isValid.city.tip} />
                          <Input name='CEP' type='text' onChange={this.handleInputChange} id='cep' value={this.state.cep} maxLength={9} regex={isValid.cep.regex} tooltip={isValid.cep.tip} />
                        </div>
                        <Button name='Confirmar Alterações' to='/perfil/cfg' onClick={this.updateLocal} />
                      </div>
                    </WhiteThing>
                    <WhiteThing className='alterar-usuario'>
                      <h2>Alterar Usuário</h2>
                      <div className='cca'>
                        <Input name='Email' type='text' onChange={this.handleInputChange} id='email' value={this.state.email} maxLength={50} regex={isValid.email.regex} tooltip={isValid.email.tip} />
                        <Input name='Nome' type='text' onChange={this.handleInputChange} id='name' value={this.state.name} maxLength={50} regex={isValid.name.regex} tooltip={isValid.name.tip} />
                        <Input name='Senha' type='password' onChange={this.handleInputChange} id='password' value={this.state.password} maxLength={20} regex={isValid.password.regex} tooltip={isValid.password.tip} />
                        <div className='half'>
                          <Input name='Celular' type='text' onChange={this.handleInputChange} id='phoneNumber' value={this.state.phoneNumber} maxLength={17} />
                          <Input name='Imagem' type='file' id='imagem' onChange={this.handleInputImage} accept="image/*" />
                        </div>
                        <Button name='Confirmar Alterações' to='/perfil/cfg' onClick={this.updateMaid} />
                      </div>
                    </WhiteThing>
                    <WhiteThing className='alterar-servicos'>
                      <h2>Alterar Dias e Serviços</h2>
                      <div className='cca t'>
                        <div>
                          <DropDownCheck id='alterar-dias' label='Dias disponíveis'>
                            <CheckItem label='Segunda' id='monday' checked={this.state.monday} onClick={this.handleInputCheck} />
                            <CheckItem label='Terça' id='tuesday' checked={this.state.tuesday} onClick={this.handleInputCheck} />
                            <CheckItem label='Quarta' id='wednesday' checked={this.state.wednesday} onClick={this.handleInputCheck} />
                            <CheckItem label='Quinta' id='thursday' checked={this.state.thursday} onClick={this.handleInputCheck} />
                            <CheckItem label='Sexta' id='friday' checked={this.state.friday} onClick={this.handleInputCheck} />
                            <CheckItem label='Sabado' id='saturday' checked={this.state.saturday} onClick={this.handleInputCheck} />
                            <CheckItem label='Domingo' id='sunday' checked={this.state.sunday} onClick={this.handleInputCheck} />
                          </DropDownCheck>
                          <DropDownCheck id='alterar-periodo' label='Períodos disponíveis'>
                            <CheckItem label='Manhã' id='morning' checked={this.state.morning} onClick={this.handleInputCheck} />
                            <CheckItem label='Tarde' id='afternoon' checked={this.state.afternoon} onClick={this.handleInputCheck} />
                            <CheckItem label='Noite' id='night' checked={this.state.night} onClick={this.handleInputCheck} />
                          </DropDownCheck>
                          <DropDownCheck id='alterar-servico' label='Serviços prestados'>
                            <CheckItem label='Babá' id='nanny' checked={this.state.nanny} onClick={this.handleInputCheck} />
                            <CheckItem label='Cuidar Casa' id='careHouse' checked={this.state.careHouse} onClick={this.handleInputCheck} />
                            <CheckItem label='Limpar Casa' id='cleanHouse' checked={this.state.cleanHouse} onClick={this.handleInputCheck} />
                            <CheckItem label='Passar Roupas' id='ironClothes' checked={this.state.ironClothes} onClick={this.handleInputCheck} />
                            <CheckItem label='Lavar Roupas' id='washClothes' checked={this.state.washClothes} onClick={this.handleInputCheck} />
                            <CheckItem label='Lavar Louça' id='washDishes' checked={this.state.washDishes} onClick={this.handleInputCheck} />
                            <CheckItem label='Cozinhar' id='cook' checked={this.state.cook} onClick={this.handleInputCheck} />
                          </DropDownCheck>
                        </div>
                        <Button name='Confirmar Alterações' to='/perfil/cfg' onClick={this.updateDeS} />
                      </div>
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
                  <span>{this.state.perfil.locations.cep}</span>
                </div>
                {this.renderServices()}
              </div>
            </div>
        }

      </div>
    );
  }
}