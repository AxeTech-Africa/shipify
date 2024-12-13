// Import Firebase App and Features
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getDatabase, ref, get, set, update } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUpDopjbJprQKQ_2k3xoVivYi4kvdYH8U",
  authDomain: "shipify-5317c.firebaseapp.com",
  projectId: "shipify-5317c",
  storageBucket: "shipify-5317c.firebaseapp.com",
  messagingSenderId: "737784439616",
  appId: "1:737784439616:web:3554a3060fcaba2ce0d0a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Database
const auth = getAuth(app);
const database = getDatabase(app);

// Fetch user details from the database
const fetchUserDetails = async (userId) => {
  const userRef = ref(database, 'users/' + userId);  // Fetch data under 'users/{userId}'
  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val(); // Return user data as an object
    } else {
      console.log("No data available for user:", userId);
      return null;
    }
  } catch (error) {
    console.error("Error getting user data: ", error);
    return null;
  }
};

export { auth, database, fetchUserDetails  };
