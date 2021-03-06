import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import ProfileService from '../lib/profile-service';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Map from '../components/Map';

import '../stylesheets/Profile.css';

class OthersProfile extends Component {

  state = {
    username: '',
    profileImg: '',
    profileStatus: '',
    following: [],
    posts: [],
    isLoading: true,
    toggle: false,
    buttonName: 'Map',
  }

  componentDidMount() {
    this.getPosts();   
  }

  getPosts = () => {
    const { id } = this.props.match.params;
    ProfileService.getOthersProfile(id)
      .then((data) => {
        this.setState({
          username: data[1].username,
          profileImg: data[1].profileImg,
          profileStatus: data[1].profileStatus,
          following: data[1].following,
          posts: data[0],
          isLoading: false,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  renderPosts = () => {
    return this.state.posts.map((post,index) => 
      <Link className='image' key={index} to={`/post/${post._id}`}>
          <img src={post.imageUrl} alt='post'/>
      </Link>
  )}

  handleFormFollow = (event) => {
    event.preventDefault();
    const { id } = this.props.match.params;
    let loggedUsername = this.props.user.username;
    ProfileService.followOthers(loggedUsername, id)
      .then((data) => {
        this.props.setUser(data)
      })
      .catch(error => console.log(error))
  }

  handleFormUnfollow = (event) => {
    event.preventDefault();
    const { id } = this.props.match.params;
    let loggedUsername = this.props.user.username;
    ProfileService.unfollowOthers(loggedUsername, id)
      .then((data) => {
        this.props.setUser(data)
      })
      .catch(error => console.log(error))
  }

  isFollowing = () => {
    const { id } = this.props.match.params;
    const loggedUser = this.props.user._id;
    if(loggedUser === id) {
    
    } else {
      if(this.props.user.following.includes(id)) {
        return (
          <Form  onSubmit={this.handleFormUnfollow}>
            <Button id='follow-unfollow' variant="primary" type="submit">
              Unfollow
            </Button>
          </Form>
        ) 
      } else {
        return (
          <Form  onSubmit={this.handleFormFollow}>
            <Button id='follow-unfollow' variant="primary" type="submit">
              Follow
            </Button>
          </Form>
        )
      }
    }
  }

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
    const { username, profileImg, profileStatus,following } = this.state;
    const {buttonName} = this.state;
    return (
      <div >
        <div className='profile-container'>
          <div className='profile-img'>
            <img  src={profileImg}  alt='profile-img'/>
            <div id='following'>
              <h5>{following.length}</h5>
              <h5>following</h5>
            </div>
            {this.isFollowing()}
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
          {this.renderToggle()}
        </div>
      </div>
    )
  }
}

export default withAuth()(OthersProfile);