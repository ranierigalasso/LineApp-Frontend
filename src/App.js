import React, { Component } from 'react';
import {Switch} from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navbar';
import AuthProvider from './components/AuthProvider';

import Profile from './pages/Profile';
import Create from './pages/Create';
import Feed from './pages/Feed';
import Signup from './pages/Signup';
import Login from './pages/Login';

import './stylesheets/App.css';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Navbar />
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/feed" component={Feed} />
            <PrivateRoute path="/create" component={Create} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
