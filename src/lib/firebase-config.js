import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIRE_APIKEY,
  authDomain: process.env.REACT_APP_FIRE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIRE_DATABASE,
  storageBucket: process.env.REACT_APP_FIRE_STORAGE,
};

firebase.initializeApp(config);
