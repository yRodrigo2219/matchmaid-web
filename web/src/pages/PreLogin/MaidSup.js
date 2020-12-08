import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Input from '../../components/Input';
import NavButton from '../../components/NavButton';
import WhiteThing from '../../components/WhiteThing';
import DropDownCheck from '../../components/DropDownCheck';
import CheckItem from '../../components/CheckItem';
import Slider from '../../components/Slider';

import './SignupSteps.css';

export default class MaidSup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      preco: 20
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
        <span>Cadastro Maid</span>
        <WhiteThing className='shadow'>
          <BrowserRouter>
            <Switch>
              <Route path='/cadastro/maid/3'>
                <div>
                  <div className='progression'>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                  </div>
                  <div className='dropdowns'>
                    <DropDownCheck id='cadastro-dias' label='Dias disponíveis'>
                      <CheckItem label='Segunda' />
                      <CheckItem label='Terça' />
                      <CheckItem label='Quarta' />
                      <CheckItem label='Quinta' />
                      <CheckItem label='Sexta' />
                      <CheckItem label='Sabado' />
                      <CheckItem label='Domingo' />
                    </DropDownCheck>
                    <DropDownCheck id='cadastro-periodo' label='Dias disponíveis'>
                      <CheckItem label='Dia' />
                      <CheckItem label='Tarde' />
                      <CheckItem label='Noite' />
                    </DropDownCheck>
                    <DropDownCheck id='cadastro-servico' label='Serviços prestados'>
                      <CheckItem label='Babá' />
                      <CheckItem label='Limpar Casa' />
                      <CheckItem label='Cozinhar' />
                    </DropDownCheck>
                  </div>
                  <div className='cadastro-preco'>
                    <div>
                      <span>Defina o preço do seu serviço por hora</span>
                      <Slider onChange={this.handleInputChange} value={this.state.preco} id='preco' />
                      <span>R$ {this.state.preco},00</span>
                    </div>
                  </div>

                </div>
                <div className='avanco'>
                  <NavButton to='/cadastro/maid/2' name='<' />
                  <NavButton to='/cadastro/maid/3' name='' />
                </div>
              </Route>
              <Route path='/cadastro/maid/2'>
                <div>
                  <div className='progression'>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                  </div>
                  <Input name='Rua' type='text' onChange={this.handleInputChange} id='street' />
                  <Input name='Bairro' type='text' onChange={this.handleInputChange} id='neigh' />
                  <div className='half'>
                    <Input name='Número' type='text' onChange={this.handleInputChange} id='nmr' />
                    <Input name='Complemento' type='text' onChange={this.handleInputChange} id='compl' />
                  </div>
                  <div className='half'>
                    <Input name='Cidade' type='text' onChange={this.handleInputChange} id='city' />
                    <Input name='CEP' type='text' onChange={this.handleInputChange} id='cep' />
                  </div>
                </div>
                <div className='avanco'>
                  <NavButton to='/cadastro/maid/1' name='<' />
                  <NavButton to='/cadastro/maid/3' name='>' />
                </div>
              </Route>
              <Route path='/cadastro/maid'>
                <div>
                  <div className='progression'>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                  </div>
                  <Input name='Email' type='email' onChange={this.handleInputChange} id='email' />
                  <Input name='Nome' type='text' onChange={this.handleInputChange} id='name' />
                  <Input name='Senha' type='password' onChange={this.handleInputChange} id='password' />
                  <div className='half'>
                    <Input name='Celular' type='text' onChange={this.handleInputChange} id='phone' />
                    <Input name='Data' type='text' onChange={this.handleInputChange} id='birth' />
                  </div>
                </div>
                <div className='avanco'>
                  <NavButton to='/cadastro/maid' name='' />
                  <NavButton to='/cadastro/maid/2' name='>' />
                </div>
              </Route>
            </Switch>
          </BrowserRouter>
        </WhiteThing>
      </div>
    );
  }
}