import axios from 'axios';

class Profile {
  constructor() {
    this.profile = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
  }

  getProfile() {
    return this.profile.get('/profile')
    .then(({data}) => {
      return data;
    });
  }
}

const ProfileService = new Profile();

export default ProfileService;