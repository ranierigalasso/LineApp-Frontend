import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import { Card, Button, Form } from 'react-bootstrap';
import ProfileService from '../lib/profile-service';
import FirebaseProfileImage from '../components/FirebaseProfileImage';

import  {callAlert} from '../actions';
import  {callSuccess} from '../actions';
import {connect} from 'react-redux';

import '../stylesheets/Settings.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faSignOutAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faPen, faSignOutAlt, faTrashAlt);

class Settings extends Component {

  state = {
    status: '',
  }

  componentDidMount = () => {
    this.getStatus()
  }

  componentWillUnmount = () => {
    const {callSuccess, callAlert} = this.props; 
    callAlert('');
    callSuccess('');
  }

  getStatus = () => {
    const { profileStatus } = this.props.user;
    this.setState({
      status: profileStatus,
    })
  }

  handleStatusChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  
  handleStatusSubmit = (event) => {
    event.preventDefault();
    const {status} = this.state;
    const {callSuccess, callAlert} = this.props; 
    ProfileService.statusUpdate(status)
      .then((data) => {
        callSuccess('Status has been updated dude!')
        this.props.setUser(data);
        this.props.history.push(`/settings`);
      })
      .catch((error) => {
        callAlert('There has been an error dude!')
        console.log(error);
      }) 
  }

  handleDeleteSubmit = () => {
    ProfileService.deleteMyProfile()
      .then(() => {
        this.props.user = null;
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    const { logout } = this.props;
    const { profileImg, username } = this.props.user;
    const { status } = this.state;
    return (
      <div className='settings-container'>
          <Card.Img id='image' src={profileImg} />
          <FirebaseProfileImage userId={this.props.user._id}/>
          <Card.Body>
            <Card.Title>Hey, {username}</Card.Title>
            <Form onSubmit={this.handleStatusSubmit}>
                <Form.Control type="text" name="status" value={status} onChange={this.handleStatusChange} />                
                <Button type='submit'>
                  Update Status
                </Button>
            </Form>
            <div className='alert-positive'>
              <p>{this.props.success}</p>
              <p>{this.props.alert}</p>
            </div>
            <div className='bottom-btns'>
              <Form onSubmit={this.handleDeleteSubmit}>
                <Button variant="primary" type="submit">
                  <FontAwesomeIcon icon="trash-alt" size="1x" />                              
                </Button>
              </Form>
              <Button onClick={logout} variant="primary" type="submit">
                <FontAwesomeIcon icon="sign-out-alt" size="1x" />                                            
              </Button>
            </div>
          </Card.Body>
      </div>
    )
  }
}

function mapStateToProps ({success, alert}) {
  return {success, alert}
}

const mapDispatchToProps = dispatch => ({
  callSuccess: (message) => dispatch(callSuccess(message)),
  callAlert: (message) => dispatch(callAlert(message))
});

export default  connect(mapStateToProps, mapDispatchToProps)(withAuth()(Settings));
