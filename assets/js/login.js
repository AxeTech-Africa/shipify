import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

document.getElementById('login-one__form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the form from reloading the page

  const email = document.getElementById('formEmail').value;
  const password = document.getElementById('formPassword').value;

  try {
    // Login user with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    alert('Login successful! Redirecting to dashboard...');
    window.location.href = 'index.html'; // Redirect to homepage or dashboard
  } catch (error) {
    alert(`Login failed: ${error.message}`);
  }
});
