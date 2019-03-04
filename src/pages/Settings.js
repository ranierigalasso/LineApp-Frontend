import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import { Card, Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import ProfileService from '../lib/profile-service';
import FirebaseProfileImage from '../components/FirebaseProfileImage';

import '../stylesheets/Settings.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faSignOutAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faPen, faSignOutAlt, faTrashAlt);

class Settings extends Component {
  state= {
    status: '',
  }

  componentDidMount = () => {
    this.getStatus()
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
    ProfileService.statusUpdate(status)
      .then((data) => {
        this.props.setUser(data);
        this.props.history.push(`/settings`);
      })
      .catch((error) => {
        console.log(error);
      }) 
  }
  handleDeleteSubmit = () => {
    ProfileService.deleteMyProfile()
      .then(() => {
        this.props.user = null;
        this.props.history.push('/login');
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    const { logout } = this.props;
    const { profileImg, username } = this.props.user;
    const { status } = this.state;
    console.log(this.props)
    return (
      <div className='settings-container'>
          <Card.Img id='image' src={profileImg} />
          <FirebaseProfileImage userId={this.props.user._id}/>
          <Card.Body>
            <Card.Title>Hey, {username}</Card.Title>
            <Form onSubmit={this.handleStatusSubmit}>
                <Form.Control type="text" name="status" value={status} onChange={this.handleStatusChange} />                
                <Button type='submit'>
                  {/* <FontAwesomeIcon icon="pen" size="1x" />                                             */}
                  Update Status
                </Button>
            </Form>
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

export default withAuth()(Settings);