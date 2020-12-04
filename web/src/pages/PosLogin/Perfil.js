import React, { Component } from "react";

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
      <div className='content search'>
        {
          this.state.perfil === null
            ?
            ''
            :
            this.state.perfil.name
        }
      </div>
    );
  }
}