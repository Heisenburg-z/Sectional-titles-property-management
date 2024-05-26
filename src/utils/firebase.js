// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMx6xx4wiX_K7AQ_IB9l0H_zDPWGTzqwA",
  authDomain: "sectional-titles-property.firebaseapp.com",
  projectId: "sectional-titles-property",
  storageBucket: "sectional-titles-property.appspot.com",
  messagingSenderId: "1018382361851",
  appId: "1:1018382361851:web:c3c7c0411eccee75137c5e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;