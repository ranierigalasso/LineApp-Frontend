import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import ProfileService from '../lib/profile-service';
import { Card, Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import { withAuth } from './AuthProvider';

import '../stylesheets/Spinner.css';
import '../lib/firebase-config'

class FirebaseProfileImage extends Component {
  state = {
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: ''
  };

  loading = () => {
    const { isUploading } = this.state;
    if( isUploading === true) {
      return <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    } 
  }

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    console.log(filename)
    this.setState({avatar: filename, progress: 100, isUploading: false});
    firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.props.imageUrlGetter(url));
  };
  render() {
  return (
  <div>
    <form style={{display:'flex',justifyContent:'center'}}>
      <label style={{width:'6rem',backgroundColor: '#007eff', color: 'white', padding: '0', borderRadius: '4rem', pointer: 'cursor'}}>
        <FileUploader
          accept="image/*"
          name="avatar"
          randomizeFilename
          storageRef={firebase.storage().ref('images')}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />
      </label>
    </form>
    {this.loading()}
  </div>
  );
}
}
export default withAuth()(FirebaseProfileImage);