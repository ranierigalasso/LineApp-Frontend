import axios from 'axios';

class Profile {
  constructor() {
    this.profile = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
  }

  getMyProfile() {
    return this.profile.get('/profile/me')
    .then(({data}) => {
      return data;
    });
  }
  getOthersProfile(id) {
    return this.profile.get(`/profile/${id}`)
    .then(({data}) => {
      return data;
    });
  }
}

const ProfileService = new Profile();

export default ProfileService;