import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../lib/auth-service';
import { Form, Button } from 'react-bootstrap';

import '../stylesheets/Auth.css';

class Signup extends Component {

  state = {
    username: "",
    password: "",
  };
handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    auth.signup({ username, password })
      .then( (user) => {
        this.setState({
            username: "",
            password: "",
        });
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
      <div >
        <img src={require('../images/login-logo.png')} />
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
      </div>
    )
  }
}

export default Signup;