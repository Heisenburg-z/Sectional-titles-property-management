// firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcO8jVeRAeoY6sPAMnkq1XPvOG1TKUt1U",
  authDomain: "property-management-9e8b0.firebaseapp.com",
  projectId: "property-management-9e8b0",
  storageBucket: "property-management-9e8b0.appspot.com",
  messagingSenderId: "541844495942",
  appId: "1:541844495942:web:6b23b47c4620478ae87447",
  measurementId: "G-4CGTGXG7J6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;

