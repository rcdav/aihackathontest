import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyApDTo9wWWzkbLG79MiSTm_AIPuwe-oJWI",
  authDomain: "aihckapp.firebaseapp.com",
  projectId: "aihckapp",
  storageBucket: "aihckapp.appspot.com",
  messagingSenderId: "391367794466",
  appId: "1:391367794466:web:d17db189048655fccd4f7b",
  measurementId: "G-VTNC0JKC55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);