import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import { BrowserRouter } from "react-router-dom";
// import firebase from 'firebase/app'
// import App from './App';
import * as serviceWorker from './serviceWorker';

// Disable console log on production
if (process.env.NODE_ENV === 'production') {
    console.log = function () {};  
}
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // var firebaseConfig = {
  //   apiKey: "AIzaSyDknpUUbmZasRh8o67EeuiT2t0Ru08hjvM",
  //   authDomain: "react-todo-app-4be77.firebaseapp.com",
  //   databaseURL: "https://react-todo-app-4be77.firebaseio.com",
  //   projectId: "react-todo-app-4be77",
  //   storageBucket: "react-todo-app-4be77.appspot.com",
  //   messagingSenderId: "501915973205",
  //   appId: "1:501915973205:web:1ef90a1050f49f8d81c6dc",
  //   measurementId: "G-ZTC1FRSV58"
  // };
  // // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
  // export default firebase;
ReactDOM.render(
  <BrowserRouter><Home /></BrowserRouter>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
