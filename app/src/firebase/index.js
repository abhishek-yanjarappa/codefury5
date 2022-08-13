// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9FqST_z0lgoWbvA4Nev6O2D1F4c9_sMM",
  authDomain: "codefury-29dc4.firebaseapp.com",
  projectId: "codefury-29dc4",
  storageBucket: "codefury-29dc4.appspot.com",
  messagingSenderId: "407988640602",
  appId: "1:407988640602:web:e14e791cd4574516cf7163",
  measurementId: "G-6G6SEKX287",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
