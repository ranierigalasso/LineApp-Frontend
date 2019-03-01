import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import PostService from '../lib/post-service';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../stylesheets/Post.css';

class Post extends Component {
  state = {
    creatorId: '',
    createdAt: '',
    description: '',
    imageUrl: '',
    location: '',
  }
  componentDidMount = () => {
    this.getPost();
  }
  
  getPost = () => {
    const { id } = this.props.match.params;
    PostService.getPost(id)
      .then((data) => {
        const {creatorId,createdAt, description, imageUrl, location} = data
        this.setState({
          creatorId,
          createdAt,
          description,
          imageUrl,
          location,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleFormDelete = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    PostService.deletePost(id)
      .then(() => {
        this.props.history.push('/profile/me');
      })
      .catch((error) => {
        console.log(error);
      })
  }
  userAccess = () => {
    let { creatorId } = this.state;
    let { _id } = this.props.user;
    let postId = this.props.match.params.id;
    if(creatorId === _id){
      return (
        <div>
          <Form onSubmit={this.handleFormDelete}>
            <Button variant="danger" type="submit">
              Delete
            </Button>
          </Form>
          <Link to={`/post/${postId}/edit`}>
            <Button variant="success" type="submit">
              Edit
            </Button>
          </Link>
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    
    const {createdAt, description, imageUrl, location} = this.state;   
    return (
      <div>
       <div>
        <h5>{location}</h5>
        <img src={imageUrl} alt='selected'/>
        <div>
          <p>{description}</p>
          <p>{new Date(createdAt).toDateString()}</p>
          {this.userAccess()}
        </div>
      </div>
      </div>
    )
  }
}

export default withAuth()(Post);