import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import ProfileService from '../lib/profile-service';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';

import '../stylesheets/Profile.css';

class Profile extends Component {
  state = {
    posts: [],
    isLoading: true,
    toggle: false,
    buttonName: 'Map',
    isMapOpened: false,
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

  renderMap = () => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
    });
    // console.log(map)
    
    const {posts} = this.state;
    posts.map((post,index) => {
      map.loadImage('https://i.imgur.com/MK4NUzI.png', (error, image) => {
        if (error) throw error;
        map.addImage('custom-marker', image);
        /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
        map.addLayer({
          id: `markers${index}`,
          type: 'symbol',
          /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {"title": `${post.location}`},
                  geometry: {
                    type: 'Point',
                    coordinates: [post.coords.coordinates[0], post.coords.coordinates[1]],
                  },
                },
              ],
            },
          },
          layout: {
            'icon-image': 'custom-marker',
          },
        });
      });
    })
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
      return this.renderPosts();
    } else if (toggle) {
      // document.getElementById('map').innerHTML = '';
      document.getElementById('map').innerHTML = '';
      return this.renderMap();
    }
  }
  render() {
    const { username, profileImg,profileStatus, following } = this.props.user;
    const {buttonName} = this.state;
    console.log(this.state.posts)
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
        <div className='image-container'>
          {this.renderToggle()}
        </div>
        <div className="container" id="map" ></div>        
      </div>
    )
  }
}

export default withAuth()(Profile);