import React, { Component } from "react";
import WhiteThing from "../../components/WhiteThing";
import NavButton from "../../components/NavButton";
import Input from "../../components/Input";
import Button from "../../components/Button";
import DropDownCheck from '../../components/DropDownCheck';
import CheckItem from '../../components/CheckItem';
import ColorTag from '../../components/ColorTag';
import PopupMap from '../../components/PopupMap';

import { isValid } from '../../Constants';

import './Perfil.css';
import { Route, Switch } from "react-router-dom";

export default class Perfil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // controle
      rate: 5,
      perfil: null,
      owner: false,
      imageFile: null,
      cpf: '',
      id: -1,
      // user
      name: '',
      email: '',
      phoneNumber: '',
      bibliography: '',
      pricePerHour: 0,
      password: '',
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
    this.sendAval = this.sendAval.bind(this);
    this.handleInputCheck = this.handleInputCheck.bind(this);
    this.handleInputImage = this.handleInputImage.bind(this);
    this.closeMap = this.closeMap.bind(this);
    this.openMap = this.openMap.bind(this);
    this.getLonglat = this.getLonglat.bind(this);
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

  badInputsLocal = () => {
    let message = '';

    let keys = ['cep', 'uf', 'street', 'city', 'houseNumber', 'neighborhood'];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (!isValid[key].regex.test(this.state[key]))
        return [true, isValid[key].message];
    }

    return [false, message];
  }

  badInputsMaid = () => {
    let message = '';

    let keys = ['email', 'password', 'name', 'cpf'];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (!isValid[key].regex.test(this.state[key]))
        return [true, isValid[key].message];
    }

    return [false, message];
  }

  sendAval() {
    let user = JSON.parse(localStorage.getItem('userInfo'));
    let authToken = localStorage.getItem('accessToken');

    let rate = {
      clientId: user.maid.id || user.client.id,
      clientName: user.maid.name || user.client.name,
      stars: this.state.rate,
      goodWork: true,
      onTime: true,
      arrivedOnTime: true,
    };

    fetch(`http://localhost:3333/create/maid/rating/${this.state.id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(rate)
    })
      .then(() => {
        alert("Avaliado com Sucesso!")
        let user = this.state.perfil;
        user.ratings.push(rate);
        localStorage.setItem('userInfo', JSON.stringify(user));
        this.setState({
          perfil: user
        });
      })
      .catch(() => alert("Erro ao avaliar"))
  }

  updateLocal() {
    let [isBad, message] = this.badInputsLocal();
    if (isBad) {
      alert(message)
      return;
    }

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

    let authToken = localStorage.getItem('accessToken');

    fetch(`http://localhost:3333/update/maid/location/${this.state.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(local)
    })
      .then(res => res.text())
      .then(_ => {
        let user = this.state.perfil;
        user.locations = local;
        localStorage.setItem('userInfo', JSON.stringify(user));
        alert('Atualizado com sucesso!')
        this.setState({
          perfil: user
        });
      })
      .catch(res => alert(res))
  }

  updateMaid = async () => {
    let [isBad, message] = this.badInputsMaid();
    if (isBad) {
      alert(message)
      return;
    }

    let maid = {
      cpf: this.state.cpf,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
      birthDate: "1999-06-26T03:00:00",
      status: false,
      bibliography: this.state.bibliography,
      pricePerHour: this.state.pricePerHour,
      numberOfVisits: 0,
      image: 'image'//await this.getBase64(this.state.imageFile)
    };

    let authToken = localStorage.getItem('accessToken');

    fetch(`http://localhost:3333/update/maid/${this.state.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(maid),
    })
      .then(res => res.text())
      .then(_ => {
        let user = this.state.perfil;
        maid.id = this.state.id;
        user.maid = maid;
        localStorage.setItem('userInfo', JSON.stringify(user));
        alert('Atualizado com sucesso!')
        this.setState({
          perfil: user
        });
      })
      .catch(res => alert(res))
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

    let authToken = localStorage.getItem('accessToken');

    fetch(`http://localhost:3333/update/maid/disponibleDays/${this.state.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(dias),
    })
      .then(res => res.text())
      .then(_ => {
        fetch(`http://localhost:3333/update/maid/disponiblePeriod/${this.state.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(hora),
        })
          .then(res => res.text())
          .then(_ => {
            fetch(`http://localhost:3333/update/maid/services/${this.state.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
              },
              body: JSON.stringify(serv),
            })
              .then(res => res.text())
              .then(_ => {
                let user = this.state.perfil;
                user.disponibleDays = dias;
                user.disponiblePeriods = hora;
                user.services = serv;
                localStorage.setItem('userInfo', JSON.stringify(user));
                alert('Atualizado com sucesso!')
                this.setState({
                  perfil: user
                });
              })
          })
      })
      .catch(res => console.log(res))
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleInputImage(e) {
    if (!!e.target.type) {
      if (!e.target.files[0].type.includes('image/png') && !e.target.files[0].type.includes('image/jpeg') && !e.target.files[0].type.includes('image/jpg')) {
        e.target.value = '';
        alert("Tipo inválido");
      } else if (e.target.files[0].size > 2150000) {
        e.target.value = '';
        alert("Arquivo excede o tamanho maximo(2MB)");
      } else {
        this.setState({ imageFile: e.target.files[0] })
      }
    }

  }

  handleInputCheck(e) {
    this.setState({
      [e.target.name]: e.target.checked
    });
  }

  componentDidMount() {
    if ('true' === localStorage.getItem('owner')) {
      let user = JSON.parse(localStorage.getItem('userInfo'));
      this.setState({
        perfil: user,
        owner: true,
        id: user.maid.id,
        cpf: user.maid.cpf,
        // user
        name: user.maid.name,
        email: user.maid.email,
        phoneNumber: user.maid.phoneNumber,
        bibliography: user.maid.bibliography,
        pricePerHour: user.maid.pricePerHour,
        image: user.maid.image,
        // location
        longitude: user.locations.longitude,
        latitude: user.locations.latitude,
        street: user.locations.street,
        houseNumber: user.locations.houseNumber,
        complement: user.locations.complement,
        neighborhood: user.locations.neighborhood,
        city: user.locations.city,
        cep: user.locations.cep,
        uf: user.locations.uf,
        // dias
        monday: user.disponibleDays.monday,
        tuesday: user.disponibleDays.tuesday,
        wednesday: user.disponibleDays.wednesday,
        thursday: user.disponibleDays.thursday,
        friday: user.disponibleDays.friday,
        saturday: user.disponibleDays.saturday,
        sunday: user.disponibleDays.sunday,
        // hora
        morning: user.disponiblePeriods.morning,
        afternoon: user.disponiblePeriods.afternoon,
        night: user.disponiblePeriods.night,
        // serv
        nanny: user.services.nanny,
        careHouse: user.services.careHouse,
        cleanHouse: user.services.cleanHouse,
        ironClothes: user.services.ironClothes,
        washClothes: user.services.washClothes,
        washDishes: user.services.washDishes,
        cook: user.services.cook
      });
    } else {
      this.setState({ perfil: JSON.parse(localStorage.getItem('perfilVisit')), owner: false });
    }
  }

  renderDays() {
    let d = this.state.perfil.disponibleDays;

    return (
      <div className='servico'>
        <h2>Disponivel</h2>
        {d.monday ? <ColorTag color='cyan'>Segunda</ColorTag> : ''}
        {d.tuesday ? <ColorTag color='red'>Terça</ColorTag> : ''}
        {d.wednesday ? <ColorTag color='purple'>Quarta</ColorTag> : ''}
        {d.thursday ? <ColorTag color='blue'>Quinta</ColorTag> : ''}
        {d.friday ? <ColorTag color='orange'>Sexta</ColorTag> : ''}
        {d.saturday ? <ColorTag color='yellow'>Sabado</ColorTag> : ''}
        {d.sunday ? <ColorTag color='lightblue'>Domingo</ColorTag> : ''}
      </div>
    );
  }

  renderHours() {
    let d = this.state.perfil.disponiblePeriods;

    return (
      <div className='servico'>
        <h2>Horários</h2>
        {d.morning ? <ColorTag color='lightblue'>Manhã</ColorTag> : ''}
        {d.afternoon ? <ColorTag color='red'>Tarde</ColorTag> : ''}
        {d.night ? <ColorTag color='purple'>Noite</ColorTag> : ''}
      </div>
    );
  }

  renderServices() {
    let s = this.state.perfil.services;

    return (
      <div className='servico'>
        <h2>Serviços</h2>
        {s.nanny ? <ColorTag color='cyan'>Babá</ColorTag> : ''}
        {s.cleanHouse ? <ColorTag color='red'>Limpa a Casa</ColorTag> : ''}
        {s.careHouse ? <ColorTag color='blue'>Cuida da Casa</ColorTag> : ''}
        {s.ironClothes ? <ColorTag color='lightblue'>Passa a Roupa</ColorTag> : ''}
        {s.washClothes ? <ColorTag color='yellow'>Lava a Roupa</ColorTag> : ''}
        {s.washDishes ? <ColorTag color='orange'>Lava a Louça</ColorTag> : ''}
        {s.cook ? <ColorTag color='purple'>Cozinha</ColorTag> : ''}
      </div>
    );
  }

  avaliate() {
    return (
      <div className='send-rate'>
        <h2>Enviar sua avaliação:</h2>
        <div>
          <span>Nota:</span>
          <input type="range" min="0" max="5" value={this.state.rate} className='rating-slide' name='rate' onChange={this.handleInputChange} />
        </div>
        <button onClick={this.sendAval}>Enviar</button>
      </div>
    );
  }

  renderInteractions() {
    let i = this.state.perfil.interactions;
    let a = [];
    let set = new Set();
    i.forEach(it => {
      set.add(it.clientId);
    });

    for (let i = 0; i < set.size; i++)
      a.push(<img key={Math.random()} src='https://image.flaticon.com/icons/png/128/51/51256.png?ga=GA1.2.1391951570.1603459063' alt='1' />);
    return a;
  }

  renderAval() {
    let r = this.state.perfil.ratings;
    let a = [];

    for (let i = 0; (i < r.length) && i < 2; i++) {
      a.push(<div key={Math.random()} className='aval'>
        <img src='https://image.flaticon.com/icons/png/128/51/51256.png?ga=GA1.2.1391951570.1603459063' alt='1' />
        <span>
          <div className='name'>{r[r.length - 1 - i].clientName}</div>
          <div>Avaliou com {r[r.length - 1 - i].stars} estrelas</div>
        </span>
      </div>);
    }
    return a;
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
                      <PopupMap visible={this.state.mapVisible} onClickAway={this.closeMap} onClick={this.getLonglat} view={{ longitude: this.state.longitude, latitude: this.state.latitude, zoom: 14, maxZoom: 20, }} data={[{ lngLat: [this.state.longitude, this.state.latitude] }]} />
                      <h2>Alterar Endereço</h2>
                      <div className='cca'>
                        <Input name='Rua' type='text' onChange={this.handleInputChange} id='street' value={this.state.street} maxLength={150} regex={isValid.street.regex} tooltip={isValid.street.tip} />
                        <div className='half'>
                          <Input name='Bairro' type='text' onChange={this.handleInputChange} id='neighborhood' value={this.state.neighborhood} maxLength={50} regex={isValid.neighborhood.regex} tooltip={isValid.neighborhood.tip} />
                          <Button to='/perfil/cfg' name='Localização Precisa' onClick={this.openMap} />
                        </div>
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
                      <div>
                        {this.renderInteractions()}
                      </div>
                    </WhiteThing>
                    <WhiteThing className='avaliacoes'>
                      <h2>Últimas Avaliações</h2>
                      <div>
                        {this.renderAval()}
                      </div>
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
                {this.renderDays()}
                {this.renderHours()}
                {this.state.owner ? this.avaliate() : this.avaliate()}
              </div>
            </div>
        }

      </div>
    );
  }
}