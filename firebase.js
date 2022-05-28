// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB4Cy7dvLKqEpYzqDxQEQqhr__dj-fB2Y",
  authDomain: "to-do-be9c3.firebaseapp.com",
  projectId: "to-do-be9c3",
  storageBucket: "to-do-be9c3.appspot.com",
  messagingSenderId: "831187194872",
  appId: "1:831187194872:web:346c5880b95677faf63c0d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)