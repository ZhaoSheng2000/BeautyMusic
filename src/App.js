import React from 'react';
import './App.less';
import { Redirect, Route, Switch, HashRouter, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login/Login'
import Detali from './pages/Detail/Detail'
import Hmoe from './pages/Home/Home'
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login}></Route>
      <Route path='/' component={Hmoe}></Route>
      <Route path="/detail" component={Detali}></Route>
    </Switch>
  </BrowserRouter>
);
export default App;