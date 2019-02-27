import axios from 'axios';

class Create {
  constructor() {
    this.create = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
  }

  createPost(body) {
    console.log(body)
    return this.create.post('/create', body)
  }

}

const createService = new Create();

export default createService;