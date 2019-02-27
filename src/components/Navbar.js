import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';

import '../stylesheets/Navbar.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faUserAlt, faPlusSquare, faSearch, faHome } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch, faHome, faPlusSquare, faUserAlt, faCog);

class Navbar extends Component {
  render() {
    const { isLogged, logout } = this.props;
    if (isLogged) {
      return (
      <div>
        <div className='top'>
            <img className='logo' src={require('../images/logo.png')} />
            <p onClick={logout}>Logout</p>
          </div>
          <div className='bottom'>
          <div className='bottom-item'>
            <Link to='/feed'>
              <FontAwesomeIcon icon="home" size="2x" />
            </Link>
          </div>
          <div className='bottom-item'>
            <FontAwesomeIcon icon="search" size="2x"/>
          </div>
          <div className='bottom-item'>
            <Link to='/create'>
              <FontAwesomeIcon icon="plus-square" size="2x" />
            </Link>
          </div>
          <div className='bottom-item'>
            <Link to='/profile'>
              <FontAwesomeIcon icon="user-alt" size="2x"/>
            </Link>
          </div>
          <div className='bottom-item'>
            <FontAwesomeIcon icon="cog" size="2x"/>
          </div>
        </div>
      </div>
      )} else {
      return <div>
        <img style={{margin: '5rem 0'}} src={require('../images/logo.png')} />
        <Link to='/login'>Log In</Link>
        <Link to='/signup'>Sign Up</Link>
      </div>
    }
  
  }
}

export default withAuth()(Navbar);