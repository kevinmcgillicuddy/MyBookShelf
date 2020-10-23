import * as firebase from 'firebase' 
import 'firebase/firestore'
// import 'firebase/auth'
// import 'firebase/database'
// import 'firebase/firestore'
// import 'firebase/storage'
// import 'firebase/functions'
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
// firebase.initializeApp(config);

const firebaseApp = firebase.initializeApp(config);
export default firebaseApp.firestore()
// export const firestore = firebase.firestore()
// export const db = firebase.database()
// export const auth = firebase.auth()
// export const storage = firebase.storage()
// export const functions = firebase.functions()
// export default firebase;