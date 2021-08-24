import React from 'react';
import './App.less';
import {  Route, Switch, HashRouter } from 'react-router-dom';
import Index from './pages/Index/Index';

const App = () => (
  <HashRouter>
    <Switch>
      <Route path='/' component={Index} />
    </Switch>
  </HashRouter>
);
export default App;