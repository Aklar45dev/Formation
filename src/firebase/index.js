import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAflQTjbyQhjCKfCt8MavXEo44czBqAIw8",
    authDomain: "cfpvd-8e8aa.firebaseapp.com",
    projectId: "cfpvd-8e8aa",
    storageBucket: "cfpvd-8e8aa.appspot.com",
    messagingSenderId: "468479557305",
    appId: "1:468479557305:web:caf729260f53221f182568",
    measurementId: "G-MW5RMKF2KW"
  }

  const db = firebase.firestore(firebase.initializeApp(firebaseConfig));
  const storage = firebase.storage()
  const firestore = firebase.firestore()

  export { storage, firestore, db, firebase as default }