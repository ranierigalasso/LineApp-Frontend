import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import FeedService from '../lib/feed-service';
import { Link } from 'react-router-dom';
import Like from '../components/Like';
import '../stylesheets/Feed.css';

class Feed extends Component {
  state = {
    posts: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getPosts();   
  }

  getPosts = () => {
    FeedService.getFeed()
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
      <Link className='username-img' to={`/profile/${post.creatorId._id}`}>
          <img src={post.creatorId.profileImg} alt='profile-img' />
          <h3>{post.creatorId.username}</h3>
      </Link>
      <Link  to={`/post/${post._id}`}>
        <div className='post-box'>
          <h5>{post.location}</h5>
          <img src={post.imageUrl} alt='feed'/>
        </div>
      </Link>
      <Like userId={this.props.user._id} paramsId={post._id}/>
    </div>
  )}

  render() {
    return (
      <div>
        {this.renderPosts()}
      </div>
    )
  }
}

export default withAuth()(Feed);