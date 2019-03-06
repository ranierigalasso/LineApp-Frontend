import React, { Component } from 'react';
import {Switch} from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navbar';
import AuthProvider from './components/AuthProvider';

import PostEdit from './pages/PostEdit';
import Post from './pages/Post';
import Settings from './pages/Settings';
import Search from './pages/Search';
import Profile from './pages/Profile';
import OthersProfile from './pages/OthersProfile';
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
            <AnonRoute exact path="/" component={Login} />
            <AnonRoute path="/signup" component={Signup} />
            <PrivateRoute path="/feed" component={Feed} />
            <PrivateRoute path="/create" component={Create} />
            <PrivateRoute path="/profile/me" component={Profile} />
            <PrivateRoute path="/profile/:id" component={OthersProfile} />
            <PrivateRoute path="/search" component={Search} />
            <PrivateRoute path="/settings" component={Settings} />
            <PrivateRoute exact path="/post/:id" component={Post} />
            <PrivateRoute exact path="/post/:id/edit" component={PostEdit} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
