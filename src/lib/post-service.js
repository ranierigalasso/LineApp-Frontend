import axios from 'axios';

class Post {
  constructor() {
    this.chosenPost = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
  }

  getPost(id) {
    return this.chosenPost.get(`/post/${id}`)
    .then(({data}) => {
      return data;
    });
  }
  deletePost(id) {
    return this.chosenPost.post(`/post/${id}`)
    .then(({data}) => {
      return data;
    });
  }
  getPostData(id) {
    return this.chosenPost.get(`/post/${id}/edit`)
    .then(({data}) => {
      return data;
    });
  }
  editPost(body, id) {
    return this.chosenPost.put(`/post/${id}/edit`, body)
    .then(({data}) => {
      return data;
    });
  }
}

const PostService = new Post();

export default PostService;