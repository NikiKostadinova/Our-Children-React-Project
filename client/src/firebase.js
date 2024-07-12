// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "our-children-6f2d4.firebaseapp.com",
  projectId: "our-children-6f2d4",
  storageBucket: "our-children-6f2d4.appspot.com",
  messagingSenderId: "651077192623",
  appId: "1:651077192623:web:a6d89a1088af6d22b83d5a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);