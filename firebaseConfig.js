// import firebase from 'firebase/compat';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
// import 'firebase/compat/storage';
// import 'firebase/compat/analytics';
import { initializeApp } from 'firebase/app';

import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebase from 'firebase/compat';
import "firebase/firestore"; // Import Firestore

// TODO: Replace the following with your app's Firebase project configuration
export const firebaseConfig = {
  apiKey: "AIzaSyClzHDQQsY3zb8XnaLNyw05aruVTqLY23A",
  authDomain: "football-connect-4.firebaseapp.com",
  projectId: "football-connect-4",
  storageBucket: "football-connect-4.appspot.com",
  messagingSenderId: "834076095082",
  appId: "1:834076095082:web:f7b1236cb71b688af8d013",
  measurementId: "G-CTE70R0PP0"
};

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export { db };


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase


