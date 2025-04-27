// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: "mern-blocks.firebaseapp.com",
  projectId: "mern-blocks",
  storageBucket: "mern-blocks.firebasestorage.app",
  messagingSenderId: "970519164110",
  appId: "1:970519164110:web:639082f3b61f7702444c9f",
  measurementId: "G-GVTE1RS4D7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
