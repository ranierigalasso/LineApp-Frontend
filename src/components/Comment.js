import React, { Component } from 'react'
import PostService from '../lib/post-service';
import { Form, Button } from 'react-bootstrap';
import { withAuth } from '../components/AuthProvider';
import DeleteComment from '../components/DeleteComment';

import '../stylesheets/Post.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faEdit, faCommentDots } from '@fortawesome/free-solid-svg-icons'

library.add(faMinusCircle, faEdit, faCommentDots);

class Comment extends Component {
  state = {
    comment: '',
    comments: [],
  }
  
  componentDidMount = () => {
    this.retrieveComments();
  }
  handleCommentSubmit = () => {
    const {comment} = this.state;
    const { _id } = this.props.user;
    const data = {
      comment,
      userId: _id
    }
    let id = this.props.paramsId;
    PostService.createComment(data, id)
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  handleCommentChange = (event) => {  
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  retrieveComments = () => {
    let {paramsId} = this.props;
    PostService.getComments( paramsId)
      .then((data) => {
        this.setState({
          comments: data,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  
  displayComments = () => {
    const { comments } = this.state;
    const { userId } = this.props;
    // console.log(comments)
    return comments.map((comment,index) => {
      if(comment.creatorId._id !== userId){
        return (
          <div key={index} className='top-comment-container'>
            <div className='comment-container' key={index}>
              <div id='comment-user'>
                <img src={comment.creatorId.profileImg} alt='profile-pic' />
                <h3><strong>{comment.creatorId.username}</strong></h3>
              </div>
              <h3><strong>{comment.creatorId.username}</strong></h3>
            </div>
            <p id='comment'>'{comment.comment}'</p>
          </div>
        )
      } else {
        return (
          <div key={index} className='top-comment-container'>
            <div className='comment-container' >
              <div id='comment-user'>
                <img src={comment.creatorId.profileImg} alt='profile-pic' />
                <h3><strong>{comment.creatorId.username}</strong></h3>
              </div>
              <p>{new Date(comment.createdAt).toDateString()}</p>
              <DeleteComment commentId={comment._id} paramsId={this.props.paramsId}/>
            </div>
            <p id='comment'>'{comment.comment}'</p>
          </div>
        )
      }
    })
  }

  render() {
    const {comment} = this.state;  
    return (
      <div>
        <Form id='comment' onSubmit={this.handleCommentSubmit}>
          <Form.Control type="text" name="comment" value={comment} onChange={this.handleCommentChange} placeholder="Comment ..." />
          <button className='universal-button' variant="primary" type="submit">
            <FontAwesomeIcon icon="comment-dots" size="1x" />              
          </button> 
        </Form>
        {this.displayComments()}
      </div>
    )
  }
}

export default withAuth()(Comment);