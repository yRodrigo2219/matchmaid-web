import React, { Component } from "react";
import WhiteThing from '../../components/WhiteThing';
import { StaticMap } from 'react-map-gl';
import { IconLayer } from '@deck.gl/layers'
import DeckGL from '@deck.gl/react';
import { MapView } from '@deck.gl/core';
import { Redirect } from 'react-router-dom';

import './Search.css';
import 'mapbox-gl/dist/mapbox-gl.css';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rota: ''
    };
  }

  data = [
    { "coordinates": [-40.361861, -14.524967], "name": 'João Pedro', "number": '7792002396' },
    { "coordinates": [-40.360822, -14.527118], "name": 'Rodrigo Rico', "number": '7799999999' },
    { "coordinates": [-40.374464, -14.523845], "name": 'Enzo Burgues', "number": '7788888888' },
    { "coordinates": [-40.363101, -14.525303], "name": 'Shambino Bow', "number": '7766666666' }
  ]

  MAP_VIEW = new MapView({ repeat: true });

  MAP_STYLE = 'https://tiles.basemaps.cartocdn.com/gl/voyager-gl-style/style.json';

  INITIAL_VIEW_STATE = {
    longitude: -40.361861,
    latitude: -14.524967,
    zoom: 15,
    maxZoom: 20,
  };

  ICON_MAPPING = {
    marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
  };

  layer = new IconLayer({
    id: 'icon-layer',
    data: this.data,
    pickable: true,
    iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
    iconMapping: this.ICON_MAPPING,
    sizeScale: 50,
    getIcon: d => 'marker',
    getPosition: d => d.coordinates,
    getColor: d => [Math.sqrt(d.exits), 200, 80]
  });

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
                  <input type='checkbox' />
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
              <DeckGL layers={[this.layer]}
                views={this.MAP_VIEW}
                initialViewState={this.INITIAL_VIEW_STATE}
                controller={{ dragRotate: false }}
                onClick={({ object }) => {
                  if (object != null) {
                    localStorage.setItem('perfil', JSON.stringify(object));
                    this.setState({ rota: '/perfil' });
                  }
                }}
                getTooltip={({ object }) => object && {
                  html: `<div class="tooltip"> <img src='https://image.flaticon.com/icons/png/128/51/51256.png?ga=GA1.2.1391951570.1603459063'>
            <img/>
            <h2>${object.name}<h2>
            <h4>${object.number}<h4>
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