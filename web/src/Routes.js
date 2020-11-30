import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HeaderPL from './pages/PreLogin/Header';
import HomePL from './pages/PreLogin/Home';
import Login from './pages/PreLogin/Login';
import Signup from './pages/PreLogin/Signup';

export default function Routes() {
  return (
    <BrowserRouter>
      <HeaderPL />
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/cadastro'>
          <Signup />
        </Route>
        <Route path='/'>
          <HomePL />
        </Route>
      </Switch>
    </BrowserRouter>

  );
}