import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import PostService from '../lib/post-service';
import { Form } from 'react-bootstrap';

import '../stylesheets/Post.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinusCircle, faEdit, faCommentDots } from '@fortawesome/free-solid-svg-icons'

library.add(faMinusCircle, faEdit, faCommentDots);

class Like extends Component {
  
  state = {
    likes: 0,
  }
  
  componentDidMount = () => {
    this.getLikes()
  }
  
  getLikes = () => {
    let id = this.props.paramsId;
    PostService.getPostLikes(id)
      .then((data) => {
        this.setState({
          likes: data.likes,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  
  
  handleLikeClick = (event) => {
    event.preventDefault();
    const {paramsId, userId} = this.props;
    PostService.addLike(paramsId,userId)
    .then((data) =>{
      this.setState({
        likes: data.likes,
      })
    })
    .catch((error)=>{
      console.log(error)
    })    
  }

  render() {
    return (
      <div id='like-container'>
        <Form onSubmit={this.handleLikeClick}>
          <button id="like" type='submit'>
            <img  src={require('../images/like.png')}  alt='like'/>
          </button>
        </Form>
        <span>{this.state.likes} shaka</span>
      </div>
    )
  }
}

export default withAuth()(Like);