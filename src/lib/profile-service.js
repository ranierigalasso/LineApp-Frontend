import axios from 'axios';

class Profile {
  constructor() {
    this.profile = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }

  getMyProfile() {
    return this.profile.get('/profile/me')
    .then(({data}) => {
      return data;
    });
  }
  deleteMyProfile () {
    return this.profile.delete('/profile/me')
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
  statusUpdate(status){
    return this.profile.put('/settings', { status })
    .then(({data}) => {
      return data;
    });
  }
  changeProfilePicture(data){
    return this.profile.post(`/settings/picture`, { data })
    .then(({data}) => {
      return data
    });
  }
}

const ProfileService = new Profile();

export default ProfileService;