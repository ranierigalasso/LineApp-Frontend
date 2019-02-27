import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import createService from '../lib/create-service';

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
    createService.createPost(body)
      .then((success) => {
        //this.props.history.push(`/`);
      })
      .catch((error) => {console.log(error.message)})

    // auth.signup({ username, password })
    //   .then( (user) => {
    //     this.setState({
    //         username: "",
    //         password: "",
    //     });
    //     this.props.setUser(user)
    //   })
    //   .catch( error => console.log(error) )
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
        <h1>Lets create a post!</h1>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="location" value={location} onChange={this.handleChange} placeholder='Location'/>
          <input type="text" name="imageUrl" value={imageUrl} onChange={this.handleChange} placeholder='Image URL'/>
          <input type="text" name="description" value={description} onChange={this.handleChange} placeholder='Description'/>
          <input style={{background:'blue', color: 'white'}} type="submit" value="Share" />
        </form>
      </div>
    )
  }
}

export default withAuth()(Create);