import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9v4hkTxso6YNOfBW-WkIbdqShvqrOHIQ",
  authDomain: "measurementapp-a3f31.firebaseapp.com",
  databaseURL: "https://measurementapp-a3f31.firebaseio.com",
  projectId: "measurementapp-a3f31",
  storageBucket: "measurementapp-a3f31.appspot.com",
  messagingSenderId: "428738005064",
  appId: "1:428738005064:web:293b21138700ccc1a1707d",
  measurementId: "G-8TGM4YRSFM"
};

// Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebase.firestore().settings({});

  const storage = firebase.storage();

  export {
      storage, firebase as default
    };