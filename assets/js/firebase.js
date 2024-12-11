import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUpDopjbJprQKQ_2k3xoVivYi4kvdYH8U",
  authDomain: "shipify-5317c.firebaseapp.com",
  projectId: "shipify-5317c",
  storageBucket: "shipify-5317c.appspot.com",
  messagingSenderId: "737784439616",
  appId: "1:737784439616:web:3554a3060fcaba2ce0d0a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
