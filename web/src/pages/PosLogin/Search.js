import React, { Component } from "react";
import WhiteThing from '../../components/WhiteThing';
import { StaticMap } from 'react-map-gl';
import { IconLayer } from '@deck.gl/layers'
import { DataFilterExtension } from '@deck.gl/extensions';
import DeckGL from '@deck.gl/react';
import { MapView } from '@deck.gl/core';
import { Redirect } from 'react-router-dom';

import './Search.css';
import 'mapbox-gl/dist/mapbox-gl.css';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rota: '',
      baba: false,
      ranger: [[0, 1000], [0, 0]],
      data: [],
    };
  }

  handleChangeBox = (event) => {
    let check = event.target.name;
    this.setState({ [check]: !this.state[check] });
    this.setState({ data: this.state.data.concat() });
  }

  componentDidMount() {
    fetch('http://localhost:3333/get/maids')
      .then(res => res.json())
      .then(res => this.setState({ data: res }));
  }

  dataFilter = new DataFilterExtension({ filterSize: 2 });

  MAP_VIEW = new MapView({ repeat: true });

  MAP_STYLE = 'https://tiles.basemaps.cartocdn.com/gl/voyager-gl-style/style.json';

  INITIAL_VIEW_STATE = {
    longitude: -40.361861,
    latitude: -14.524967,
    zoom: 2,
    maxZoom: 20,
  };

  ICON_MAPPING = {
    marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
  };

  //layer = 

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
                <label>
                  <input type='checkbox' checked={this.state.baba} name='baba' onChange={this.handleChangeBox} />
                  Babá
                </label>
              </div>

              <div className='category'>
                <span>Dias Disponíveis</span>
                <hr />
                <label>
                  <input type='checkbox' />
                  Segunda
                </label>
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
                iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
                iconMapping: this.ICON_MAPPING,
                sizeScale: 50,
                getIcon: d => 'marker',
                getPosition: d => {
                  return [d.locations.latitude, d.locations.longitude];
                },
                getColor: d => [Math.sqrt(d.exits), 200, 80],

                // Filtro
                getFilterValue: f => {
                  let n = 0;
                  n += ((this.state.baba && !f.services.nanny) ? 1 : 0);
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
                    localStorage.setItem('owner', 'false');
                    localStorage.setItem('perfil', JSON.stringify(object));
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