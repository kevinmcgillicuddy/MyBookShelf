const firebase = require('firebase/app');
var config = {
    apiKey: "AIzaSyAMe_GatQ9EqTthbKG5pg-_I6Yc5xnMEKM",
    authDomain: "my-bookshelf-d9b0e.firebaseapp.com",
    databaseURL: "https://my-bookshelf-d9b0e.firebaseio.com",
    projectId: "my-bookshelf-d9b0e",
    storageBucket: "my-bookshelf-d9b0e.appspot.com",
    messagingSenderId: "974885411889",
    appId: "1:974885411889:web:7e2c2ed9c897eadf408910",
    measurementId: "G-3CVLKJ7TEK"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.analytics();
export default firebaseApp.firestore()
export const firestore = firebaseApp.firestore()
export const auth = firebaseApp.auth()



