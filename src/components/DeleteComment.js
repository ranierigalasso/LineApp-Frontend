import React, { Component } from 'react'
import PostService from '../lib/post-service';
import { Form } from 'react-bootstrap';
import { withAuth } from '../components/AuthProvider';

import '../stylesheets/Post.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faEdit, faCommentDots } from '@fortawesome/free-solid-svg-icons'

library.add(faMinusCircle, faEdit, faCommentDots);

class DeleteComment extends Component {

  handleCommentDelete = (event) => {
    event.preventDefault();
    let {paramsId, commentId} = this.props;
    PostService.deleteComment(paramsId,commentId)
      .then((data) => {
        this.props.retrieveComments();
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
        </Form> 
      </div>
    )
  }
}

export default withAuth()(DeleteComment);