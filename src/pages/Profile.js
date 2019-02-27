import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import ProfileService from '../lib/profile-service';

class Profile extends Component {
  state = {
    posts: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getPosts();   
  }

  getPosts = () => {
    ProfileService.getProfile()
      .then((data) => {
        console.log(data);
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
      <div key={index}>
        <img src={post.imageUrl} style={{width:'7.5rem'}}/>
      </div>
  )}

  render() {
    return (
      <div style={{display:'flex', justifyContent:'space-around'}}>
        {this.renderPosts()}
      </div>
    )
  }
}

export default withAuth()(Profile);