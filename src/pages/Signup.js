import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../lib/auth-service';
import { Form, Button } from 'react-bootstrap';

import  {callAlert} from '../actions';
import {connect} from 'react-redux';

import '../stylesheets/Auth.css';

class Signup extends Component {

  state = {
    username: '',
    password: '',
  };

  componentWillUnmount = () => {
    const {callAlert} = this.props;
    callAlert('');    
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const specialCharacters = /\W|_/g; // special characters and spaces
    const specialUsername = username.match(specialCharacters);
    const specialPassword = password.match(specialCharacters);
    const {callAlert} = this.props;
    if(password === '') {
      callAlert('Empty password field mate!')
    } else if (username === '') {
      callAlert('Empty username field mate!')      
    } else if (specialUsername !== null) {
      callAlert('Username should have no special characters & spaces mate!')      
    } else if (specialPassword !== null) {
      callAlert('Password should have no special characters & spaces mate!') 
    } else {
      auth.signup({ username, password })
        .then( (user) => {
          this.setState({
              username: '',
              password: '',
          });
          this.props.setUser(user)
        })
        .catch( (error) => {
          console.log(error) 
        })
    }
  }
  

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password } = this.state;
    return (
      <div >
        <img src={require('../images/login-logo.png')} alt='full-logo'/>
        <Form className='landing-container' onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Control type="text" name="username" value={username} onChange={this.handleChange} placeholder="Username" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
            <Form.Text className="text-muted">
              Already have an account? <Link to='/login'>Log In</Link>
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
        <div className='alert'>
          <p>{this.props.alert}</p>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({alert}) {
  return {alert}
}

const mapDispatchToProps = dispatch => ({
  callAlert: (message) => dispatch(callAlert(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);