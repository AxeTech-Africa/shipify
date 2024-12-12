import { auth } from "./firebase.js"; // Import Firebase auth
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Handle form submission
document.getElementById('sign-up-one__form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission (page reload)

  // Get form values
  const name = document.getElementById('formName').value;
  const email = document.getElementById('formEmail').value;
  const phone = document.getElementById('formPhone').value;
  const password = document.getElementById('formPassword').value;

  try {
    // Step 1: Create a new user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Step 2: Store additional user details in Firestore or Realtime Database
    // This step is optional, you can add the user's name and phone here.

    console.log('User successfully registered:', user);

    // Step 3: Show success message and redirect to login page
    alert('Account created successfully! Redirecting to login page...');

    // Redirect to the login page after a short delay
    setTimeout(() => {
      window.location.href = 'login.html';  // Redirect to login page
    }, 1000);

  } catch (error) {
    console.error('Error during signup:', error);

    // Handle errors (e.g., email already in use)
    if (error.code === 'auth/email-already-in-use') {
      alert('This email is already in use. Please try logging in.');
    } else {
      alert(`Signup failed: ${error.message}`);
    }
  }
});
