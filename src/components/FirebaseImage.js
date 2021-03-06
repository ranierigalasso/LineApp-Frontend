import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import { withAuth } from './AuthProvider';

import '../stylesheets/ImageUpload.css';
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
    this.setState({
      avatar: filename, 
      progress: 100, 
      isUploading: false
    });
    firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.props.imageUrlGetter(url));
  };

  render() {
    return (
      <div className='upload-container'>
        <form id='create-form'>
          <label id='upload-label' >
            Upload Photo
            <FileUploader
              hidden
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