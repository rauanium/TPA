import firebase from "firebase"
var config = {
    apiKey: "AIzaSyBqZGzURz0Koc4OxVz5jS51_hUglGAkdvk",
    authDomain: "tpa-project-51920.firebaseapp.com",
    databaseURL: "https://tpa-project-51920.firebaseio.com",
    projectId: "tpa-project-51920",
    storageBucket: "tpa-project-51920.appspot.com",
    messagingSenderId: "901449627227"
  };
const app = firebase.initializeApp(config);


export const db = app.database()