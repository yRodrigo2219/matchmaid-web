import React, { Component } from "react";
import WhiteThing from '../../components/WhiteThing';

import './Search.css';

export default class Search extends Component{
  render(){
    return(
      <div className='content search'>
        <div className='filter'>
          <WhiteThing>
            <span>Filtrar</span>
            <div>
              <div className='category'>
                <span>Serviços</span>
                <hr/>
                <label>
                  <input type='checkbox'/>
                  Babá
                </label>
              </div>

              <div className='category'>
                <span>Dias Disponíveis</span>
                <hr/>
                <label>
                  <input type='checkbox'/>
                  Segunda
                </label>
              </div>
            </div>
          </WhiteThing>
        </div>
        <div className='map'>Map</div>
      </div>
    );
  }
}