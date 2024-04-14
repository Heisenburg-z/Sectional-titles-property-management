// firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO0D17Cd9ZS5QkTkSRU4k6f6WlSkd1nP8",
  authDomain: "property-management-2c762.firebaseapp.com",
  projectId: "property-management-2c762",
  storageBucket: "property-management-2c762.appspot.com",
  messagingSenderId: "814653970961",
  appId: "1:814653970961:web:99e215186d724cac162fb0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
