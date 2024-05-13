// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4fB4Aiv3YQkjF5iyAfqlZHd83UTSvVIw",
  authDomain: "netflixweb-d6ac3.firebaseapp.com",
  projectId: "netflixweb-d6ac3",
  storageBucket: "netflixweb-d6ac3.appspot.com",
  messagingSenderId: "393239181179",
  appId: "1:393239181179:web:e39aa5942a54ba08d6efde",
  measurementId: "G-DGVB8DPM49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();