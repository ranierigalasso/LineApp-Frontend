import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import { withAuth } from '../components/AuthProvider';
import SearchService from '../lib/search-service';
import { Link } from 'react-router-dom';

import '../stylesheets/Search.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

library.add(faEye);

class Search extends Component {

  state = {
    users: [],
    isLoading: true,
    search: '',
  }

  componentDidMount() {
    this.getUsers();   
  }

  getUsers = () => {
    SearchService.getUsers()
      .then((data) => {
        this.setState({
          users: data,
          isLoading: false,
        })
      })
      .catch((error) => {
      })
  }

  renderUsers = (users) => {
    return users.map((user,index) => 
      <div style={{display:'flex', justifyContent: 'space-between'}} key={index}>
        <h3>{user.username}</h3>
          <Link to={`/profile/${user._id}`}>
            <button className='universal-button' type="submit">
              <FontAwesomeIcon icon="eye" size="1x" />              
            </button>
          </Link> 
      </div>
  )}

  handleChange = (event) => {  
    this.setState({
      search: event.target.value,
    })
  }

  handleNewSearch () {
    let newUsers = [];
    this.state.users.map((user) => {
      const username = user.username.toLowerCase();
      const search = this.state.search.toLowerCase();
      if(username.includes(search)) {
        newUsers.push(user);
      }
    })
    return newUsers;
  }

  render() {
    const newUsers = this.handleNewSearch();
    const { search } = this.state;
    return (
      <div className='search-container'>
        <div >
          <Form id='search-input'>
            <Form.Group controlId="formBasicSearch">
              <Form.Control type="text" value={search} onChange={this.handleChange} placeholder="Search users..." />
            </Form.Group>
          </Form>
        </div>
        <div>
          {this.renderUsers(newUsers)}
        </div>
      </div>
    )
  }
}

export default withAuth()(Search);