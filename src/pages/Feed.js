import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import FeedService from '../lib/feed-service';

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
      <div className='post-box' key={index}>
        <h5>{post.location}</h5>
        <img src={post.imageUrl} alt='feed'/>
        <div>
          <p>user to display</p>
          <p>{post.description}</p>
        </div>
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