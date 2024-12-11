import { auth, createUserWithEmailAndPassword } from './firebase.js';

// Get sign-up form elements
const signUpForm = document.getElementById('sign-up-one__form');
const formName = document.getElementById('formName');
const formEmail = document.getElementById('formEmail');
const formPhone = document.getElementById('formPhone');
const formPassword = document.getElementById('formPassword');

signUpForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = formName.value;
  const email = formEmail.value;
  const phone = formPhone.value;
  const password = formPassword.value;

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Optionally, you can save additional data like name and phone number in Firestore
    const userRef = doc(firestore, "users", user.uid);
    await setDoc(userRef, {
      name: name,
      email: email,
      phone: phone
    });

    console.log("User signed up:", user);
    window.location.href = 'dashboard.html'; // Redirect to dashboard after sign-up
  } catch (error) {
    console.error("Error signing up:", error.message);
    alert("Sign-up failed. Please check the form details.");
  }
});
