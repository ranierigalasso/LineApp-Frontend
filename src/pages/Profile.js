import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import ProfileService from '../lib/profile-service';
import { Link } from 'react-router-dom';

import '../stylesheets/Profile.css';

class Profile extends Component {
  state = {
    posts: [],
    isLoading: true,
  }

  componentDidMount() {
    // console.log(this.props)
    this.getPosts();   
  }

  getPosts = () => {
    ProfileService.getMyProfile()
      .then((data) => {
        // console.log(data);
        this.setState({
          posts: data,
          isLoading: false,
        })
      })
      .catch((error) => {
      })
  }

  renderPosts = () => {
    // console.log(this.state.posts)
    return this.state.posts.map((post,index) => 
      <Link className='image' key={index} to={`/post/${post._id}`}>
          <img src={post.imageUrl} />
      </Link>
  )}

  render() {
    const { username, profileImg,profileStatus, following } = this.props.user;
    console.log(this.props)
    return (
      <div>
        <div className='profile-container'>
          <div className='profile-img'>
            <img  src={profileImg}  alt='profile-img'/>
            <div id='following'>
              <h5>{following.length}</h5>
              <h5>following</h5>
            </div>
          </div>
          <div className='username'>
            <h3 id='username'>{username}</h3>
            <h5 id='status'>{profileStatus}</h5>
          </div>
        </div>
        <div className='image-container'>
          {this.renderPosts()}
        </div>
      </div>
    )
  }
}

export default withAuth()(Profile);