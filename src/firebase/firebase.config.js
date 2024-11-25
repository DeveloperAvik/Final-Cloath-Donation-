import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBB0W9B3nWuABwbqXYsfIIHe7AGd0B75Q0",
  authDomain: "clothdonation-6339b.firebaseapp.com",
  projectId: "clothdonation-6339b",
  storageBucket: "clothdonation-6339b.firebasestorage.app",
  messagingSenderId: "194440921746",
  appId: "1:194440921746:web:541e1d5fdaa5e9d3ffdc4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export { auth, GoogleAuthProvider, signInWithPopup };