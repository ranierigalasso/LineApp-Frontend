import axios from 'axios';

class Search {
  constructor() {
    this.search = axios.create({
      baseURL: 'http://localhost:5000',
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