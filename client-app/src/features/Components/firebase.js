import firebase from 'firebase'

var firebaseApp=firebase.initializeApp({
// Your web app's Firebase configuration

    apiKey: "AIzaSyDZcQmO5PJUA9vM-ZOUrhbII84vmnsIQsU",
    authDomain: "osb-cu.firebaseapp.com",
    projectId: "osb-cu",
    storageBucket: "osb-cu.appspot.com",
    messagingSenderId: "246957009366",
    appId: "1:246957009366:web:5d02c4d23a3745b9c69c77"
  
})

var db=firebaseApp.firestore();

export {db};