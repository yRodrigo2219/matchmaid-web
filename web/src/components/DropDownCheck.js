import React, { Component } from 'react';

export default class DropDownCheck extends Component {
  /*componentDidMount() {
    let checkList = document.getElementById(this.props.id);
    checkList.onclick = function (evt) {
      if (checkList.classList.contains('visible'))
        checkList.classList.remove('visible');
      else
        checkList.classList.add('visible');
    }
  }*/

  render() {
    return (
      <div className='dropdown-check-list visible' id={this.props.id}>
        <span className='anchor'>{this.props.label}</span>
        <ul className='items'>
          {this.props.children}
        </ul>
      </div>
    );
  }
}