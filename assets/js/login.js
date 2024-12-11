import { auth, signInWithEmailAndPassword } from './firebase.js';

// Get login form elements
const loginForm = document.getElementById('login-one__form');
const formEmail = document.getElementById('formEmail');
const formPassword = document.getElementById('formPassword');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = formEmail.value;
  const password = formPassword.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in:", user);
    window.location.href = 'dashboard.html'; // Redirect to dashboard on successful login
  } catch (error) {
    console.error("Error logging in:", error.message);
    alert("Login failed. Please check your email and password.");
  }
});
