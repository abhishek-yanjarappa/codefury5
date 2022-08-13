// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtW3NTrjm3Za_z_1ewqZolHh0gKoxYcnA",
  authDomain: "codefury5-b58d7.firebaseapp.com",
  projectId: "codefury5-b58d7",
  storageBucket: "codefury5-b58d7.appspot.com",
  messagingSenderId: "189569264902",
  appId: "1:189569264902:web:127f0d061c8fb6cd8cc287",
  measurementId: "G-66EJV8ESDF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
