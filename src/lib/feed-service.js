import axios from 'axios';

class Feed {
  constructor() {
    this.feed = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
  }

  getFeed() {
    return this.feed.get('/feed',)
    .then(({data}) => {
      return data;
    });
  }
}

const FeedService = new Feed();

export default FeedService;