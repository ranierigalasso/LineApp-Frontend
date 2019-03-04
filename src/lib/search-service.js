import axios from 'axios';

class Search {
  constructor() {
    this.search = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }

  getUsers() {
    return this.search.get('/search')
    .then(({data}) => {
      return data;
    });
  }
}

const SearchService = new Search();

export default SearchService;