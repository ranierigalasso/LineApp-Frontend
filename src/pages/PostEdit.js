import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import { Form, Button } from 'react-bootstrap';
import PostService from '../lib/post-service';
import { Link } from 'react-router-dom';

import '../stylesheets/PostEdit.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace, faEdit } from '@fortawesome/free-solid-svg-icons'

library.add(faBackspace, faEdit);

class PostEdit extends Component {
  state = {
    oldPost: {},
    location: '',
    imageUrl: '',
    description: '',
  }
  componentDidMount() {
    this.getPost();   
  }

  getPost = () => {
    const { id } = this.props.match.params;
    PostService.getPostData(id)
      .then((data) => {
        let { location, imageUrl, description} = data;
        this.setState({
          location,
          imageUrl,
          description,
        })
      })
      .catch((error) => {
      })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {location, imageUrl, description} = this.state;
    const { id } = this.props.match.params;
    const body = {
      location,
      imageUrl,
      description,
    }
    PostService.editPost(body , id)
      .then(() => {
        console.log('done')
        this.props.history.push(`/post/${id}`);
      })
      .catch((error) => {console.log(error.message)}) 
  }

  handleChange = (event) => {  
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { location, imageUrl, description } = this.state;
    const { id } = this.props.match.params;
    return (
      <div className='post-edit'>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="formBasicLocation">
            <Form.Control type="text" name="location" value={location} onChange={this.handleChange} placeholder="Location" />
          </Form.Group>
          {/* <Form.Group controlId="formBasicImage">
            <Form.Control type="text" name="imageUrl" value={imageUrl} onChange={this.handleChange} placeholder="Image URL" />
          </Form.Group> */}
          <Form.Group controlId="formBasicDescription">
            <Form.Control type="text" name="description" value={description} onChange={this.handleChange} placeholder="Description" />
          </Form.Group>
          <div className='edit-buttons'>
            <Link to={`/post/${id}`}>
              <Button variant="primary" type="submit">
                <FontAwesomeIcon icon="backspace" size="1x" />              
              </Button>
            </Link>
            <Button variant="primary" type="submit">
              <FontAwesomeIcon icon="edit" size="1x" />              
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default withAuth()(PostEdit);