import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import ProfileService from '../lib/profile-service';

class Profile extends Component {
  state = {
    posts: [],
    isLoading: true,
  }

  componentDidMount() {
    console.log(this.props)
    this.getPosts();   
  }

  getPosts = () => {
    ProfileService.getMyProfile()
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
    const { username, profileImg } = this.props.user;
    return (
      <div >
        <div style={{background:'wheat',display:'flex', padding:'2rem'}}>
          <img style={{height:'3rem', width:'3rem', borderRadius:'10px'}} src={profileImg} />
          <h3>
            {username}
          </h3>
        </div>
        <div style={{display:'flex', justifyContent:'space-around'}}>
          {this.renderPosts()}
        </div>
      </div>
    )
  }
}

export default withAuth()(Profile);