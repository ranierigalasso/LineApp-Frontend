import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import { Card, Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import ProfileService from '../lib/profile-service';

class Settings extends Component {
  handleProfileDelete = () => {
    ProfileService.deleteMyProfile()
      .then((data) => {
        // console.log(data)
        this.props.user = null;
        this.props.history.push('/login');
      })
      .catch((error) => {
        console.log(error)
      })
  }
  render() {
    console.log(this.props)
    const { logout } = this.props;
    const { profileImg, username, profileStatus } = this.props.user;
    return (
      <div>
        <Card style={{ width: '100%', padding: '0 2.5rem'}}>
          <Card.Img style={{height:'15rem'}} variant="top" src={profileImg} />
          <Card.Body>
            <Card.Title>Hey, {username}</Card.Title>
            <Card.Text>
            {profileStatus}
            <Button onClick={this.handleStatusClick}>Update</Button>
            </Card.Text>
          </Card.Body>
        </Card>
        <Button onClick={logout} variant="primary" type="submit">
          Log Out
        </Button>
        <Form onSubmit={this.handleProfileDelete}>
          <Button variant="danger" type="submit">
            Delete Profile
          </Button>
        </Form>
      </div>
    )
  }
}

export default withAuth()(Settings);