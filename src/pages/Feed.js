import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import FeedService from '../lib/feed-service';
import { Link } from 'react-router-dom';

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
        console.log(data)
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
      <Link key={index} to={`/post/${post._id}`}>
        <div className='post-box'>
          <h5>{post.location}</h5>
          <h5>{post.creatorId.username}</h5>
          <img src={post.imageUrl} alt='feed'/>
        </div>
      </Link>
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