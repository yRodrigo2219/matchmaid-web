import React, { Component } from "react";
import WhiteThing from "../../components/WhiteThing";
import NavButton from "../../components/NavButton";
import Tag from "../../components/Tag";

import './Perfil.css';

export default class Perfil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      perfil: null
    };
  }

  componentDidMount() {
    this.setState({ perfil: JSON.parse(localStorage.getItem('perfil')) });
  }

  renderServices() {
    let s = this.state.perfil.services;

    return (
      <div className='servico'>
        <h2>Serviços</h2>
        {s.nanny ? <Tag name="Baba" color='red'/> : ''}
        {s.cleanHouse ? <Tag name="Limpar Casa" color='cian'/> : ''}
        {s.careHouse ? <Tag name="Cuida da Casa" color='blue'/> : ''}
        {s.ironClothes ? <Tag name="Passa a Roupa" color='red'/> : ''}
        {s.washClothes ? <Tag name="Lava a Roupa" color='cian'/> : ''}
        {s.washDishes ? <Tag name="Lava a Louça" color='blue'/> : ''}
        {s.cook ? <Tag name="Cozinha" color='red'/> : ''}
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
                  <img src='https://image.flaticon.com/icons/png/128/51/51256.png?ga=GA1.2.1391951570.1603459063'></img>
                  <span>{this.state.perfil.maid.name}</span>
                </div>
                <div className='categ'>
                  <NavButton to='/perfil' name='Perfil' />
                </div>
              </div>
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