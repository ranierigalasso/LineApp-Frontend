import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import { Card, Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import ProfileService from '../lib/profile-service';

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
  getStatus = () => {
    console.log(this.props.user)
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
        // console.log(data);
        this.props.setUser(data);
        // console.log(this.state.status)
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
    return (
      <div className='settings-container'>
        <Card>
          <Card.Img id='image' src={profileImg} />
          <Card.Body>
            <Card.Title>Hey, {username}</Card.Title>
            <Form onSubmit={this.handleStatusSubmit}>
                <Form.Control type="text" name="status" value={status} onChange={this.handleStatusChange} />                
                <Button type='submit'>
                  <FontAwesomeIcon icon="pen" size="1x" />                                            
                </Button>
            </Form>
            <div className='bottom-btns'>
              <Button onClick={logout} variant="primary" type="submit">
                <FontAwesomeIcon icon="sign-out-alt" size="1x" />                                            
              </Button>
              <Form onSubmit={this.handleDeleteSubmit}>
                <Button variant="primary" type="submit">
                  <FontAwesomeIcon icon="trash-alt" size="1x" />                              
                </Button>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default withAuth()(Settings);