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
  createComment (data,id) {
    return this.chosenPost.post(`/post/${id}/comment`, { data })
    .then(({data}) => {
      return data;
    });
  }
  getComments (id) {
    return this.chosenPost.get(`/post/${id}/comment`)
    .then(({data}) => {
      return data;
    });
  }
  deleteComment(paramsId, commentId){
    return this.chosenPost.post(`/post/${paramsId}/comment/delete`,{ commentId })
    .then(({data}) => {
      return data;
    });
  }
  addLike(paramsId, userId) {
    return this.chosenPost.post(`/post/${paramsId}/comment/like`, { userId })
    .then(({data}) => {
      return data;
    });
  }
}

const PostService = new Post();

export default PostService;