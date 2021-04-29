import React from 'react';
import './App.less';
import { Redirect, Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from './pages/Login/Login'
import AuthRoute from './pages/AuthRoute/AuthRoute'
import Detali from './pages/Detail/Detail'
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login}></Route>
      <AuthRoute path="/detail" component={Detali}></AuthRoute>
      <Redirect to="/login"></Redirect>
    </Switch>
  </BrowserRouter>

);
export default App;