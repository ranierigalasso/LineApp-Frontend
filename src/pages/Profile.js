import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import ProfileService from '../lib/profile-service';
import { Link } from 'react-router-dom';
import Map from '../components/Map';

import '../stylesheets/Profile.css';

class Profile extends Component {
  state = {
    posts: [],
    isLoading: true,
    toggle: false,
    buttonName: 'Map',
  }

  componentDidMount() {
    this.getPosts();   
  }

  getPosts = () => {
    ProfileService.getMyProfile()
      .then((data) => {
        this.setState({
          posts: data,
          isLoading: false,
        })
      })
      .catch((error) => {
      })
  }

  renderPosts = () => {
    return this.state.posts.map((post,index) => 
      <Link className='image' key={index} to={`/post/${post._id}`}>
          <img src={post.imageUrl} alt='grid-img'/>
      </Link>
  )}

  togglePostsMap = () => {
    const { toggle } = this.state;
    if(toggle) {
      this.setState({
        toggle: false,
        buttonName: 'Map',
      })
    } else if (!toggle) {
      this.setState({
        toggle: true,
        buttonName: 'Posts',
      })  
    }
  }
  renderToggle = () => {
    const { toggle } = this.state;
    if(!toggle) {
      return (
        <div className='image-container'>
        {this.renderPosts()}
        </div>
      )
    } else if (toggle) {
      return <Map posts={this.state.posts}/>
    }
  }
  render() {
    const { username, profileImg,profileStatus, following } = this.props.user;
    const {buttonName} = this.state;
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
          <div className='buttons-container'>
            <button onClick={this.togglePostsMap} className='profile-button'>
              {buttonName}
            </button>
          </div>
        </div>
        {this.renderToggle()}
      </div>
    )
  }
}

export default withAuth()(Profile);