import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Wallet from './pages/Wallet';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
