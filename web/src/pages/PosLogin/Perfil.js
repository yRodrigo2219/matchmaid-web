import React, { Component } from "react";
import WhiteThing from "../../components/WhiteThing";

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
                  <span>C</span>
                </div>
              </div>
              <div className='p2'>

              </div>
              <div className='p3'>

              </div>
            </div>
        }

      </div>
    );
  }
}