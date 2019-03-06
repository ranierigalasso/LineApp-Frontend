import React, { Component } from 'react';
import auth from '../lib/auth-service';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import '../stylesheets/Auth.css';

class Login extends Component {

  state = {
    username: '',
    password: '',
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state
    auth.login({ username, password })
    .then( (user) => {
      this.props.setUser(user)
    })
    .catch( error => console.log(error) )
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
      </div>
    )
  }
}

export default Login;