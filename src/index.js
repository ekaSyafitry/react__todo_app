import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import firebase from 'firebase/app'
// import App from './App';
import * as serviceWorker from './serviceWorker';

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCu-mkd53d_zjG-t2L_iEbbdSo328vdRPs",
    authDomain: "todo-app-f0fbb.firebaseapp.com",
    databaseURL: "https://todo-app-f0fbb.firebaseio.com",
    projectId: "todo-app-f0fbb",
    storageBucket: "todo-app-f0fbb.appspot.com",
    messagingSenderId: "523414125327",
    appId: "1:523414125327:web:1a248a8ff599c92234dc7a",
    measurementId: "G-SQE8C7JJ3W"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase;
ReactDOM.render(<Home />, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
