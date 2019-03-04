import React, { Component } from 'react'
import PostService from '../lib/post-service';
import { Form, Button } from 'react-bootstrap';
import { withAuth } from '../components/AuthProvider';

import '../stylesheets/Post.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faEdit, faCommentDots } from '@fortawesome/free-solid-svg-icons'

library.add(faMinusCircle, faEdit, faCommentDots);

class DeleteComment extends Component {
  handleCommentDelete = () => {
    let {paramsId, commentId} = this.props;
    console.log(paramsId)
    console.log(commentId)
    PostService.deleteComment(paramsId,commentId)
      .then((data) => {
        console.log(data)
        this.props.history.push(`/post/${paramsId}`);
      })
      .catch((error) => {
        console.log(error)
      })
  }
  render() {
    return (
      <div>
        <Form onSubmit={this.handleCommentDelete}>
          <button className='universal-button' variant="primary" type='submit'>
            <FontAwesomeIcon icon="minus-circle" size="1x" />                            
          </button>
          {/* <Button variant="primary" type='submit'>
            <FontAwesomeIcon icon="minus-circle" size="1x" />                            
          </Button> */}
        </Form> 
      </div>
    )
  }
}

export default withAuth()(DeleteComment);