import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import ProfileService from '../lib/profile-service';

class OthersProfile extends Component {
  state = {
    username: '',
    profileImg: '',
    posts: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getPosts();   
  }

  getPosts = () => {
    const { id } = this.props.match.params;
    ProfileService.getOthersProfile(id)
      .then((data) => {
        console.log(data[1]);
        this.setState({
          username: data[1].username,
          profileImg: data[1].profileImg,
          posts: data[0],
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
    const { username, profileImg } = this.state;
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

export default withAuth()(OthersProfile);