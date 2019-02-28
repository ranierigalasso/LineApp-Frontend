import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import { Card, Button, Form, FormControl, FormGroup } from 'react-bootstrap';

class Settings extends Component {

  handleStatusClick = () => {
    return (
      <div>
        <Form>
          <FormGroup>
            <FormControl type='text' />
            <Button />
          </FormGroup>
        </Form>
      </div>
    )
  }
  render() {
    console.log(this.props.user)
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
          
        </Card>;
      </div>
    )
  }
}

export default withAuth()(Settings);