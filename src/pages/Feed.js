import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import FeedService from '../lib/feed-service';

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
    return this.state.posts.map((post) => 
      <div>
        <h5>{post.location}</h5>
        <img src={post.imageUrl} style={{width: '50vh'}}/>
        <p>{post.description}</p>
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