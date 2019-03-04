import axios from 'axios';

class Feed {
  constructor() {
    this.feed = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
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