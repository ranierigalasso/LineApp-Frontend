import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import ProfileService from '../lib/profile-service';
import { Form, Button } from 'react-bootstrap';

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
        this.setState({
          username: data[1].username,
          profileImg: data[1].profileImg,
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
      <div key={index}>
        <img src={post.imageUrl} style={{width:'7.5rem'}}/>
      </div>
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
    if(this.props.user.following.includes(id)) {
      return (
        <Form onSubmit={this.handleFormUnfollow}>
          <Button variant="primary" type="submit">
            Unfollow
          </Button>
        </Form>
      ) 
    } else {
      return (
        <Form onSubmit={this.handleFormFollow}>
          <Button variant="primary" type="submit">
            Follow
          </Button>
        </Form>
      )
    }
  }

  render() {
    const { username, profileImg } = this.state;
    return (
      <div >
        <div style={{background:'wheat',display:'flex', padding:'2rem'}}>
          <img style={{height:'3rem', width:'3rem', borderRadius:'10px'}} src={profileImg} />
          <h3>
            {username}
          </h3>
          {this.isFollowing()}
        </div>
        <div style={{display:'flex', justifyContent:'space-around'}}>
          {this.renderPosts()}
        </div>
      </div>
    )
  }
}

export default withAuth()(OthersProfile);