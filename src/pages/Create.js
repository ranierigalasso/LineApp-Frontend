import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import CreateService from '../lib/create-service';
import { Form, Button } from 'react-bootstrap';
import FirebaseImage from '../components/FirebaseImage';

import '../stylesheets/Create.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'

library.add(faShare);

class Create extends Component {

  state = {
    location: '',
    imageUrl: '',
    description: '',
    lat:'',
    long:'',
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {location, imageUrl, description, lat, long} = this.state;
    const body = {
      location,
      imageUrl,
      description,
      lat,
      long,
    }
    CreateService.createPost(body)
      .then(() => {
        this.props.history.push(`/feed`);
      })
      .catch((error) => {console.log(error.message)}) 
  }

  handleChange = (event) => {  
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  imageUrlGetter = (url) => {
    this.setState({
      imageUrl: url,
    })
  }

  renderImage = () => {
    if(this.state.imageUrl !== ''){
      return <img src={this.state.imageUrl} alt='upload'/>
    }
  }

  handleGeolocation = () => {
    window.navigator.geolocation.getCurrentPosition((success) => {
      const lat = success.coords.latitude;
      const long = success.coords.longitude;
      this.setState({
        lat,
        long,
      })
    }, (error) => {
      console.log(error);
    });
  }

  render() {
    const { location, description } = this.state;
    return (
      <div className='create-container'>
        {this.handleGeolocation()}
        {this.renderImage()}
        <FirebaseImage userId={this.props.user._id} imageUrlGetter={this.imageUrlGetter}/>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="formBasicLocation">
            <Form.Control type="text" name="location" value={location} onChange={this.handleChange} placeholder="Location" />
          </Form.Group>
          <Form.Group controlId="formBasicDescription">
            <Form.Control type="text" name="description" value={description} onChange={this.handleChange} placeholder="Description" />
          </Form.Group>
          <div id='create-btn'>
          <Button variant="primary" type="submit">
            <FontAwesomeIcon icon="share" size="1x" />                
          </Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default withAuth()(Create);