import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';

import '../stylesheets/Map.css'

export default class Map extends Component {
  map = null
  markers = []
  state = {
    map: null
  }

  componentDidMount = () => {
    this.renderMap();
    this.createMarkers();
  }
  
  renderMap = () => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 1,
      center: [2.173404,41.385063],
    });
  }

  createMarkers = () => {
    const { posts } = this.props;    
    posts.forEach(post => {
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setText(post.location);
      const poi = new mapboxgl.Marker()
        .setLngLat([post.coords.coordinates[0], post.coords.coordinates[1]])
        .setPopup(popup)
        .addTo(this.map);
      this.markers.push(poi);
    });
  }
  
  render() {    
    return (
      <div className='map-container'>
        <div className="container" id="map" ></div>                
      </div>
    )
  }
}
