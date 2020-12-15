import React, { Component } from "react";
import WhiteThing from '../../components/WhiteThing';
import { StaticMap } from 'react-map-gl';
import { IconLayer } from '@deck.gl/layers';
import { DataFilterExtension } from '@deck.gl/extensions';
import DeckGL from '@deck.gl/react';
import { MapView } from '@deck.gl/core';
import { Redirect } from 'react-router-dom';

import marker from '../../Images/imgs/marker.png';
import { tryToken } from '../../Constants';

import './Search.css';
import 'mapbox-gl/dist/mapbox-gl.css';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // workaround
      rota: '',
      maidId: -1,
      clientId: -1,
      // filter servico
      nanny: false,
      careHouse: false,
      cleanHouse: false,
      ironClothes: false,
      washClothes: false,
      washDishes: false,
      cook: false,
      // filter dia
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
      // filter periodo
      morning: false,
      afternoon: false,
      night: false,
      // map
      ranger: [[0, 10000], [0, 0]],
      data: [],
    };
  }

  handleChangeBox = (event) => {
    let check = event.target.name;
    this.setState({ [check]: !this.state[check] });
    this.setState({ data: this.state.data.concat() });
  }

  async createInteraction(maidId) {
    while (await fetch('http://localhost:3333/create/interaction', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clientId: this.state.clientId, maidId: maidId, accessTime: new Date().toISOString().slice(0, 19) })
    })
      .then((res) => tryToken(res, 201))
      .then(([err, json]) => {
        if (!err) {
          return false;
        }
        if (err && json) {
          return true;
        }
        return false;
      })
      .catch(_ => {
        this.props.logout();
        return false;
      })) { };
  }

  async componentDidMount() {
    let isMaid = ('true' === localStorage.getItem('isMaid'));
    if (isMaid) {
      let user = JSON.parse(localStorage.getItem('userInfo'));
      console.log(user)
      this.setState({
        maidId: user.maid.id,
        clientId: parseInt(localStorage.getItem('clientId'))
      });
    } else {
      this.setState({
        clientId: parseInt(localStorage.getItem('clientId'))
      })
    }

    // get maids
    while (await fetch('http://localhost:3333/get/maids', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => tryToken(res, 200))
      .then(([err, json]) => {
        if (!err) {
          this.setState({ data: json });
        } else if (err && json) {
          return true;
        }
        return false;
      })
      .catch(res => {
        console.log(res);
        this.props.logout();
        return false;
      })) { }
  }

  dataFilter = new DataFilterExtension({ filterSize: 2 });

  MAP_VIEW = new MapView({ repeat: true });

  //MAP_STYLE = 'https://tiles.basemaps.cartocdn.com/gl/voyager-gl-style/style.json';
  MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

  INITIAL_VIEW_STATE = {
    longitude: (JSON.parse(localStorage.getItem('userInfo')).locations.longitude || 0),
    latitude: (JSON.parse(localStorage.getItem('userInfo')).locations.latitude || 0),
    zoom: 14,
    maxZoom: 20,
  };

  ICON_MAPPING = {
    marker: { x: 0, y: 0, width: 512, height: 786, mask: true }
  };

  render() {
    return (
      <div className='content search'>
        <div className='filter'>
          <WhiteThing>
            <span>Filtrar</span>
            <div>
              <div className='category'>
                <span>Serviços</span>
                <hr />
                <label><input type='checkbox' checked={this.state.nanny} name='nanny' onChange={this.handleChangeBox} />Babá</label>
                <label><input type='checkbox' checked={this.state.careHouse} name='careHouse' onChange={this.handleChangeBox} />Cuidar Casa</label>
                <label><input type='checkbox' checked={this.state.cleanHouse} name='cleanHouse' onChange={this.handleChangeBox} />Limpar Casa</label>
                <label><input type='checkbox' checked={this.state.ironClothes} name='ironClothes' onChange={this.handleChangeBox} />Passar Roupas</label>
                <label><input type='checkbox' checked={this.state.washClothes} name='washClothes' onChange={this.handleChangeBox} />Lavar Roupas</label>
                <label><input type='checkbox' checked={this.state.washDishes} name='washDishes' onChange={this.handleChangeBox} />Lavar Louça</label>
                <label><input type='checkbox' checked={this.state.cook} name='cook' onChange={this.handleChangeBox} />Cozinhar</label>
              </div>

              <div className='category'>
                <span>Dias Disponíveis</span>
                <hr />
                <label><input type='checkbox' checked={this.state.monday} name='monday' onChange={this.handleChangeBox} />Segunda</label>
                <label><input type='checkbox' checked={this.state.tuesday} name='tuesday' onChange={this.handleChangeBox} />Terça</label>
                <label><input type='checkbox' checked={this.state.wednesday} name='wednesday' onChange={this.handleChangeBox} />Quarta</label>
                <label><input type='checkbox' checked={this.state.thursday} name='thursday' onChange={this.handleChangeBox} />Quinta</label>
                <label><input type='checkbox' checked={this.state.friday} name='friday' onChange={this.handleChangeBox} />Sexta</label>
                <label><input type='checkbox' checked={this.state.saturday} name='saturday' onChange={this.handleChangeBox} />Sabado</label>
                <label><input type='checkbox' checked={this.state.sunday} name='sunday' onChange={this.handleChangeBox} />Domingo</label>
              </div>
              <div className='category'>
                <span>Periodos Disponíveis</span>
                <hr />
                <label><input type='checkbox' checked={this.state.morning} name='morning' onChange={this.handleChangeBox} />Manhã</label>
                <label><input type='checkbox' checked={this.state.afternoon} name='afternoon' onChange={this.handleChangeBox} />Tarde</label>
                <label><input type='checkbox' checked={this.state.night} name='night' onChange={this.handleChangeBox} />Noite</label>
              </div>
            </div>
          </WhiteThing>
        </div>
        <div className='map'>
          {
            this.state.rota === '' ?
              <DeckGL layers={[new IconLayer({
                id: 'icon-layer',
                data: this.state.data,
                pickable: true,
                iconAtlas: marker,
                iconMapping: this.ICON_MAPPING,
                sizeScale: 60,
                getIcon: d => 'marker',
                getPosition: d => {
                  return [d.locations.longitude, d.locations.latitude];
                },
                getColor: d => [0, 240, 240],
                // Filtro
                getFilterValue: f => {
                  let n = 0;
                  // servicos
                  n += ((this.state.nanny && !f.services.nanny) ? 1 : 0);
                  n += ((this.state.careHouse && !f.services.careHouse) ? 1 : 0);
                  n += ((this.state.cleanHouse && !f.services.cleanHouse) ? 1 : 0);
                  n += ((this.state.ironClothes && !f.services.ironClothes) ? 1 : 0);
                  n += ((this.state.washClothes && !f.services.washClothes) ? 1 : 0);
                  n += ((this.state.washDishes && !f.services.washDishes) ? 1 : 0);
                  n += ((this.state.cook && !f.services.cook) ? 1 : 0);
                  // dias
                  n += ((this.state.monday && !f.disponibleDays.monday) ? 1 : 0);
                  n += ((this.state.tuesday && !f.disponibleDays.tuesday) ? 1 : 0);
                  n += ((this.state.wednesday && !f.disponibleDays.wednesday) ? 1 : 0);
                  n += ((this.state.thursday && !f.disponibleDays.thursday) ? 1 : 0);
                  n += ((this.state.friday && !f.disponibleDays.friday) ? 1 : 0);
                  n += ((this.state.saturday && !f.disponibleDays.saturday) ? 1 : 0);
                  n += ((this.state.sunday && !f.disponibleDays.sunday) ? 1 : 0);
                  // periodo
                  n += ((this.state.morning && !f.disponiblePeriods.morning) ? 1 : 0);
                  n += ((this.state.afternoon && !f.disponiblePeriods.afternoon) ? 1 : 0);
                  n += ((this.state.night && !f.disponiblePeriods.night) ? 1 : 0);

                  return [f.preco, n];
                },
                filterRange: this.state.ranger,
                extensions: [this.dataFilter]
              })]}
                views={this.MAP_VIEW}
                initialViewState={this.INITIAL_VIEW_STATE}
                controller={{ dragRotate: false }}
                onClick={({ object }) => {
                  if (object != null) {
                    if (object.maid.id === this.state.maidId) {
                      localStorage.setItem('owner', 'true');
                    } else {
                      localStorage.setItem('owner', 'false');
                      localStorage.setItem('perfilVisit', JSON.stringify(object));

                      this.createInteraction(object.maid.id);
                    }

                    this.setState({ rota: '/perfil' });
                  }
                }}
                getTooltip={({ object }) => object && {
                  html: `<div class="tooltip"> <img src='https://image.flaticon.com/icons/png/128/51/51256.png?ga=GA1.2.1391951570.1603459063' alt='Foto'>
                  <img/>
                  <h2>${object.maid.name}<h2>
                  <h4>${object.maid.phoneNumber}<h4>
                  <div/>`}}>
                <StaticMap reuseMaps mapStyle={this.MAP_STYLE} preventStyleDiffing={true} />
              </DeckGL>
              :
              <Redirect to={this.state.rota} />
          }
        </div>
      </div>
    );
  }
}