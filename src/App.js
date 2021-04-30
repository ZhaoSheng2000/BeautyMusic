import React from 'react';
import './App.less';
import { Redirect, Route, Switch, HashRouter } from 'react-router-dom';
import Login from './pages/Login/Login'
import AuthRoute from './pages/AuthRoute/AuthRoute'
import Detali from './pages/Detail/Detail'
const App = () => (
  <HashRouter>
    <Switch>
      <Route path="/login" component={Login}></Route>
      <AuthRoute path="/detail" component={Detali}></AuthRoute>
      <Redirect to="/login"></Redirect>
    </Switch>
  </HashRouter>
);
export default App;