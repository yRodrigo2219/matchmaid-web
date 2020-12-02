import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HeaderPL from './pages/PreLogin/Header';
import HomePL from './pages/PreLogin/Home';
import Login from './pages/PreLogin/Login';
import Signup from './pages/PreLogin/Signup';
import MaidSup from './pages/PreLogin/MaidSup';
import ClienteSup from './pages/PreLogin/ClienteSup';
import Search from './pages/PosLogin/Busca'

export default class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
    };
  }

  componentDidMount = _ => {
    //setInterval(() => this.setState({ auth: !this.state.auth }), 2500);
  }

  render() {
    return (
      <BrowserRouter>
        {
          this.state.auth ? 'lgd' : <HeaderPL />
        }
        {
          this.state.auth
            ?
            'Logado'
            :
            <Switch>
              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/cadastro/maid'>
                <MaidSup />
              </Route>
              <Route path='/cadastro/cliente'>
                <ClienteSup />
              </Route>
              <Route path='/cadastro'>
                <Signup />
              </Route>
              <Route path='/busca'>
                <Search/>
              </Route>
              <Route path='/'>
                <HomePL />
              </Route>
            </Switch>

        }
      </BrowserRouter>
    );
  }
}