import React, { Component } from 'react';
import auth from '../lib/auth-service';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import  {callAlert} from '../actions';
import {connect} from 'react-redux';

import '../stylesheets/Auth.css';

class Login extends Component {

  state = {
    username: '',
    password: '',
  }

  componentWillUnmount = () => {
    const {callAlert} = this.props;
    callAlert('');    
  }
  
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state
    const {callAlert} = this.props;
    if(password === '') {
      callAlert('Empty password field mate!')
    } else if (username === '') {
      callAlert('Empty username field mate!')      
    } else {
      auth.login({ username, password })
      .then( (user) => {
        this.props.setUser(user)
      })
      .catch( (error) => {
        console.log(error) 
        callAlert('Incorrect username or password mate!')
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
      <div>
        <img src={require('../images/login-logo.png')} alt='full-logo' />
        <Form className='landing-container' onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Control type="text" name="username" value={username} onChange={this.handleChange} placeholder="Username" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
            <Form.Text className="text-muted">
              Don't have an account? <Link to='/signup'>Sign up</Link>
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Log In
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);