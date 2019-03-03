import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import PostService from '../lib/post-service';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Comment from '../components/Comment';

import '../stylesheets/Post.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faEdit, faCommentDots } from '@fortawesome/free-solid-svg-icons'

library.add(faMinusCircle, faEdit, faCommentDots);

class Like extends Component {
  state = {
    likes: this.props.likes,
  }

  handleLikeClick = (e) => {
    e.preventDefault();
    const {paramsId, userId} = this.props;
    PostService.addLike(paramsId,userId)
    .then((data) =>{
      console.log(data)
      this.setState({
        likes: data.likes,
      })
    })
    .catch((error)=>{
      console.log(error)
    })    
  }
  render() {
    console.log(this.state)
    return (
      <div style={{display: 'flex'}}>
        <Form onSubmit={this.handleLikeClick}>
          <Button id="like" type='submit'>
            <img  src={require('../images/like.png')}  alt='like'/>
          </Button>
        </Form>
        <span>{this.state.likes}</span>
      </div>
    )
  }
}

export default withAuth()(Like);