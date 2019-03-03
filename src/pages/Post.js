import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import PostService from '../lib/post-service';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Comment from '../components/Comment';
import Like from '../components/Like';
import '../stylesheets/Post.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faEdit, faCommentDots } from '@fortawesome/free-solid-svg-icons'

library.add(faMinusCircle, faEdit, faCommentDots);

class Post extends Component {
  state = {
    creatorId: '',
    createdAt: '',
    description: '',
    imageUrl: '',
    location: '',
    username: '',
    profileImg: '',
    comment: '',
    comments: [],
    likes: 0,
  }
  componentDidMount = () => {
    this.getPost();
  }
  
  getPost = () => {
    const { id } = this.props.match.params;
    PostService.getPost(id)
      .then((data) => {
        console.log(data)
        const {createdAt, description, imageUrl, location} = data;
        const creatorId = data.creatorId._id;
        const username = data.creatorId.username;
        const profileImg = data.creatorId.profileImg;
        const likes = data.likes;
        this.setState({
          creatorId,
          createdAt,
          description,
          imageUrl,
          location,
          username,
          profileImg,
          likes,
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
        <div className='edit-delete'>
          <Form onSubmit={this.handleFormDelete}>
            <Button variant="primary" type="submit">
              <FontAwesomeIcon icon="minus-circle" size="1x" />              
            </Button>
          </Form>
          <Link to={`/post/${postId}/edit`}>
            <Button variant="primary" type="submit">
              <FontAwesomeIcon icon="edit" size="1x" />                            
            </Button>
          </Link>
        </div>
      )
    } else {
      return null;
    }
  }
 
  render() {
    const { username, createdAt, description, imageUrl, location, profileImg} = this.state;   
    return (
      <div id='post'>
        
       <div>
         <div className='top-post'>
          <Link className='username-post' to={`/profile/${this.state.creatorId}`}>
            <img src={profileImg} alt='profile-img'/>
            <h3>{username}</h3>
          </Link>
          {this.userAccess()}
         </div>

        <h5 id='location'>{location}</h5>
        <img src={imageUrl} alt='selected-post'/>
        <div className='bottom-post'>
          <Like userId={this.props.user._id} paramsId={this.props.match.params.id} likes={this.state.likes}/>
          <p id='date'>{new Date(createdAt).toDateString()}</p>
        </div>
        <div id='description'>
          <p><strong>{username}</strong> {description}</p>
        </div>
      </div>
      <Comment userId={this.props.user._id} paramsId={this.props.match.params.id}/>
      </div>
    )
  }
}

export default withAuth()(Post);