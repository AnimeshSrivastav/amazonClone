import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD04BMVc9LuP46gDWMKtqj0LbtmmXb_qJo",
  authDomain: "clone-f4210.firebaseapp.com",
  projectId: "clone-f4210",
  storageBucket: "clone-f4210.appspot.com",
  messagingSenderId: "889566056923",
  appId: "1:889566056923:web:d50e45a5d01c99907f57fe",
  measurementId: "G-8Y2RQT1KM8"
};


// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };



