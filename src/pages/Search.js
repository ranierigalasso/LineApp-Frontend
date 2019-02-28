import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import { withAuth } from '../components/AuthProvider';
import SearchService from '../lib/search-service';
import { Link } from 'react-router-dom';

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
        console.log(data)
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
            <Button variant="success" type="submit">
             View
            </Button>
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
      console.log(this.state.search)
      const search = this.state.search.toLowerCase();
      if(username.includes(search)) {
        console.log(user);
        console.log(this.state.search);
        newUsers.push(user);
      }
    })
    return newUsers;
  }

  render() {
    const newUsers = this.handleNewSearch();
    const { search } = this.state;
    return (
      <div>
        <div>
          <Form >
            <Form.Group controlId="formBasicUsername">
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