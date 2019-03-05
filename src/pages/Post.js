import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import PostService from '../lib/post-service';
import ForecastService from '../lib/stormglass-service';
import { Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Comment from '../components/Comment';
import Like from '../components/Like';

import '../stylesheets/Post.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faEdit, faCommentDots, faWater } from '@fortawesome/free-solid-svg-icons'

library.add(faMinusCircle, faEdit, faCommentDots, faWater);

class Post extends Component {
  state = {
    creatorId: '',
    createdAt: '',
    description: '',
    imageUrl: '',
    location: '',
    username: '',
    profileImg: '',
    comment: '',
    comments: [],
    likes: 0,
    forecastToggle: false,
    lat: 0,
    long: 0,
    forecastData: null,
    loading: true,
  }
  componentDidMount = () => {
    this.getPost();
  }
  
  getPost = () => {
    const { id } = this.props.match.params;
    PostService.getPost(id)
      .then((data) => {
        const {createdAt, description, imageUrl, location} = data;
        const long = data.coords.coordinates[0];
        const lat = data.coords.coordinates[1];
        const creatorId = data.creatorId._id;
        const username = data.creatorId.username;
        const profileImg = data.creatorId.profileImg;
        this.setState({
          creatorId,
          createdAt,
          description,
          imageUrl,
          location,
          username,
          profileImg,
          lat,
          long,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleFormDelete = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    PostService.deletePost(id)
      .then(() => {
        this.props.history.push('/profile/me');
      })
      .catch((error) => {
        console.log(error);
      })
  }
  userAccess = () => {
    let { creatorId } = this.state;
    let { _id } = this.props.user;
    let postId = this.props.match.params.id;
    if(creatorId === _id){
      return (
        <div className='edit-delete'>
          <Form onSubmit={this.handleFormDelete}>
            <button className='universal-button' variant="primary" type="submit">
              <FontAwesomeIcon icon="minus-circle" size="1x" />              
            </button>
          </Form>
          <Link to={`/post/${postId}/edit`}>
            <button className='universal-button'variant="primary" type="submit">
              <FontAwesomeIcon icon="edit" size="1x" />                            
            </button>
          </Link>
        </div>
      )
    } else {
      return null;
    }
  }

  getForecast = () => {
    const { long, lat } = this.state;
    const params = 'waveHeight,wavePeriod,waterTemperature,windSpeed';
    ForecastService.getForecast(lat,long,params)
      .then((response) => {
        this.setState({
          forecastData: response.hours,
          loading: false,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  
  toggleImageForecast = () => {
    const { forecastToggle } = this.state;
    if(forecastToggle === true) {
      this.setState({forecastToggle: false})
    } else if (forecastToggle === false) {
      this.getForecast();
      this.setState({forecastToggle: true})  
    }
  }

  renderForecast = (imageUrl) => {
    const { forecastToggle, forecastData, loading } = this.state;
    if(forecastToggle && !loading) {
      var date = new Date();
      date.setDate(date.getDate() + 2);
      return (
        <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th></th>
            <th>Now</th>
            <th>Tommorow</th>
            <th>{date.toLocaleDateString()}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Height</th>
            <td>{forecastData[0].waveHeight[0].value}m</td>
            <td>{forecastData[24].waveHeight[0].value}m</td>            
            <td>{forecastData[48].waveHeight[0].value}m</td>
          </tr>
          <tr>
            <th>Period</th>
            <td>{forecastData[0].wavePeriod[0].value}s</td>
            <td>{forecastData[24].wavePeriod[0].value}s</td>            
            <td>{forecastData[48].wavePeriod[0].value}s</td>
          </tr>
          <tr>
            <th>Sea Temp.</th>
            <td>{forecastData[0].waterTemperature[0].value}°C</td>
            <td>{forecastData[24].waterTemperature[0].value}°C</td>            
            <td>{forecastData[48].waterTemperature[0].value}°C</td>
          </tr>
          <tr>
            <th>Wind</th>            
            <td>{forecastData[0].windSpeed[0].value}mps</td>
            <td>{forecastData[24].windSpeed[0].value}mps</td>            
            <td>{forecastData[48].windSpeed[0].value}mps</td>
          </tr>
        </tbody>
      </Table>
      )
    } else if (!forecastToggle) {
      return (
          <div id='post-container'>
            <img id='post-image' src={imageUrl} alt='selected-post'/>
          </div>
      )
    } else if (forecastToggle && loading) {
      return (
        <div id='spinner-center'>
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      )
    }
  }

  render() {
    const { username, createdAt, description, imageUrl, location, profileImg} = this.state;  
    return (
      <div id='post'>
       <div>
         <div className='top-post'>
          <Link className='username-post' to={`/profile/${this.state.creatorId}`}>
            <img src={profileImg} alt='profile-img'/>
            <h3>{username}</h3>
          </Link>
          <button className="universal-button" onClick={this.toggleImageForecast}>
            <strong>Forecast</strong>                                     
          </button>
          {this.userAccess(imageUrl)}
         </div>
        <h5 id='location'>{location}</h5>
        {this.renderForecast(imageUrl)}
        <div className='bottom-post'>
          <Like userId={this.props.user._id} paramsId={this.props.match.params.id} />
          <p id='date'>{new Date(createdAt).toDateString()}</p>
        </div>
        <div id='description'>
          <p><strong>{username}</strong> {description}</p>
        </div>
      </div>
      <Comment userId={this.props.user._id} paramsId={this.props.match.params.id}/>
      </div>
    )
  }
}

export default withAuth()(Post);