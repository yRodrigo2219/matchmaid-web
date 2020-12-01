import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Input from '../../components/Input';
import NavButton from '../../components/NavButton';
import WhiteThing from '../../components/WhiteThing';

export default class ClienteSup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className='content supsteps'>
        <span>Cadastro Cliente</span>
        <WhiteThing className='shadow'>
          <BrowserRouter>
            <Switch>
              <Route path='/cadastro/cliente/2'>
                <div>
                  <div className='progression'>
                    <div>1</div>
                    <div>2</div>
                  </div>
                  <Input name='Rua' type='text' onChange={this.handleInputChange} id='street' />
                  <Input name='Bairro' type='text' onChange={this.handleInputChange} id='neigh' />
                  <div className='half'>
                    <Input name='Número' type='text' onChange={this.handleInputChange} id='nmr' />
                    <Input name='Complemento' type='text' onChange={this.handleInputChange} id='compl' />
                  </div>
                </div>
                <div className='avanco'>
                  <NavButton to='/cadastro/cliente/1' name='<' />
                  <NavButton to='/cadastro/cliente' name='' />
                </div>
              </Route>
              <Route path='/cadastro/cliente'>
                <div>
                  <div className='progression'>
                    <div>1</div>
                    <div>2</div>
                  </div>
                  <Input name='Email' type='email' onChange={this.handleInputChange} id='email' />
                  <Input name='Nome' type='text' onChange={this.handleInputChange} id='name' />
                  <Input name='Senha' type='password' onChange={this.handleInputChange} id='password' />
                </div>
                <div className='avanco'>
                  <NavButton to='/cadastro/cliente' name='' />
                  <NavButton to='/cadastro/cliente/2' name='>' />
                </div>
              </Route>
            </Switch>
          </BrowserRouter>
        </WhiteThing>
      </div>
    );
  }
}