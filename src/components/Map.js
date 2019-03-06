import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';

import '../stylesheets/Map.css'

export default class Map extends Component {

  componentDidMount = () => {
    this.renderMap();
  }
  
  renderMap = () => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 0,
    });
    console.log(map.style)
    const {posts} = this.props;
    map.loadImage('https://i.imgur.com/MK4NUzI.png', (error, image) => {
      if (error) throw error;
      map.addImage('custom-marker', image);
      posts.map((post,index) => {
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
  
  render() {
    return (
      <div className='map-container'>
        <div className="container" id="map" ></div>                
      </div>
    )
  }
}
