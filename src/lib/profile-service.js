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
  followOthers(loggedUsername,id){
    return this.profile.post(`/profile/${id}/follow`, { loggedUsername })
    .then(({data}) => {
      return data
    });
  }
  unfollowOthers(loggedUsername,id){
    return this.profile.post(`/profile/${id}/unfollow`, { loggedUsername })
    .then(({data}) => {
      return data
    });
  }
}

const ProfileService = new Profile();

export default ProfileService;