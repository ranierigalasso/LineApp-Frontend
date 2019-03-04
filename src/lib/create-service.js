import axios from 'axios';

class Create {
  constructor() {
    this.create = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }

  createPost(body) {
    //console.log(body)
    return this.create.post('/create', body)
  }

}

const CreateService = new Create();

export default CreateService;