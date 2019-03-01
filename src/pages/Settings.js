import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import { Card, Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import ProfileService from '../lib/profile-service';

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
        console.log(data);
        this.props.setUser(data);
        console.log(this.state.status)
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
      <div>
        <Card style={{ width: '100%', padding: '0 2.5rem'}}>
          <Card.Img style={{height:'15rem'}} variant="top" src={profileImg} />
          <Card.Body>
            <Card.Title>Hey, {username}</Card.Title>
              <Form onSubmit={this.handleStatusSubmit}>
                  <Form.Control type="text" name="status" value={status} onChange={this.handleStatusChange} />                
                  <Button type='submit'>Update</Button>
              </Form>
          </Card.Body>
        </Card>
        <Button onClick={logout} variant="primary" type="submit">
          Log Out
        </Button>
        <Form onSubmit={this.handleDeleteSubmit}>
          <Button variant="danger" type="submit">
            Delete Profile
          </Button>
        </Form>
      </div>
    )
  }
}

export default withAuth()(Settings);