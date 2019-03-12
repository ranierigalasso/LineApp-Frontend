import axios from 'axios';

export const searchService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true
});