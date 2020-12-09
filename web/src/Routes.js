import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HeaderPL from './pages/PreLogin/Header';
import HomePL from './pages/PreLogin/Home';
import Login from './pages/PreLogin/Login';
import Signup from './pages/PreLogin/Signup';
import MaidSup from './pages/PreLogin/MaidSup';
import ClienteSup from './pages/PreLogin/ClienteSup';
import Perfil from './pages/PosLogin/Perfil';
import Search from './pages/PosLogin/Search';
import Header from './pages/PosLogin/Header';

export default class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: ('true' === localStorage.getItem('logged')),
    };

    this.logoutUser = this.logoutUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  logoutUser() {
    localStorage.setItem('logged', 'false');
    this.setState({ auth: false });
  }

  loginUser() {
    localStorage.setItem('logged', 'true');
    this.setState({ auth: true });
  }

  componentDidMount = _ => {
    //setInterval(() => this.setState({ auth: !this.state.auth }), 2500);
  }

  render() {
    return (
      <BrowserRouter>
        {
          this.state.auth ? <Header logout={this.logoutUser} /> : <HeaderPL />
        }
        {
          this.state.auth
            ?
            <Switch>
              <Route path='/alterar-perfil'>
                "Alterar perfil aqui"
              </Route>
              <Route path='/perfil'>
                <Perfil />
              </Route>
              <Route path='/'>
                <Search />
              </Route>
            </Switch>
            :
            <Switch>
              <Route path='/login'>
                <Login login={this.loginUser} />
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
              <Route path='/'>
                <HomePL />
              </Route>
            </Switch>

        }
      </BrowserRouter>
    );
  }
}