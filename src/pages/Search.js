import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import { withAuth } from '../components/AuthProvider';
import { Link } from 'react-router-dom';

import  {searchUsers} from '../actions';
import {connect} from 'react-redux';

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
    this.props.searchUsers();

  }
  
  
  getUsers = () => {
    this.props.searchUsers();
  }

  renderUsers = () => {
    const { search } = this.state;
    const { searchFetch } = this.props;
    const userList = [];
    if(searchFetch){
      searchFetch.map((user) => {
        if(user.username.toLowerCase().includes(search.toLowerCase())){
          userList.push(user)
        }
      })     
      return userList.map((user,index) => 
        <div style={{display:'flex', justifyContent: 'space-between'}} key={index}>
          <h3>{user.username}</h3>
            <Link to={`/profile/${user._id}`}>
              <button className='universal-button' type="submit">
                <FontAwesomeIcon icon="eye" size="1x" />              
              </button>
            </Link> 
        </div>
      )

    }
  }

  handleChange = (event) => {  
    this.setState({
      search: event.target.value,
    })
  }

  render() {
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
          {this.renderUsers()}
        </div>
      </div>
    )
  }
}


function mapStateToProps ({searchFetch}) {
  return {searchFetch};
}

const mapDispatchToProps = dispatch => ({
  searchUsers: () => dispatch(searchUsers())
});


export default connect(mapStateToProps, mapDispatchToProps)(withAuth()(Search));
