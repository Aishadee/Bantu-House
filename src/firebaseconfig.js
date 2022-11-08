// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiZjYx82a0C_CUszZjGgwvCT9-UEUnfog",
  authDomain: "orms-b9181.firebaseapp.com",
  projectId: "orms-b9181",
  storageBucket: "orms-b9181.appspot.com",
  messagingSenderId: "25228297356",
  appId: "1:25228297356:web:8a1e32a5491c40afb4e7a9",
  measurementId: "G-FGMEYWTMCL",
  databaseURL: "https://orms-b9181-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);
export {
    app,
    analytics,
    auth,
    database
}