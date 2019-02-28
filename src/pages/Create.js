import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import CreateService from '../lib/create-service';
import { Form, Button } from 'react-bootstrap';

class Create extends Component {
  state = {
    location: '',
    imageUrl: '',
    description: '',
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {location, imageUrl, description} = this.state;
    const body = {
      location,
      imageUrl,
      description,
    }
    console.log('before createservice')
    CreateService.createPost(body)
      .then(() => {
        console.log('done')
        this.props.history.push(`/feed`);
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
    return (
      <div>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="formBasicLocation">
            <Form.Control type="text" name="location" value={location} onChange={this.handleChange} placeholder="Location" />
          </Form.Group>
          <Form.Group controlId="formBasicImage">
            <Form.Control type="text" name="imageUrl" value={imageUrl} onChange={this.handleChange} placeholder="Image URL" />
          </Form.Group>
          <Form.Group controlId="formBasicDescription">
            <Form.Control type="text" name="description" value={description} onChange={this.handleChange} placeholder="Description" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Share
          </Button>
        </Form>
      </div>
    )
  }
}

export default withAuth()(Create);