import { auth, fetchUserDetails } from './firebase.js';  // Import Firebase auth and fetchUserDetails
import { signOut } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';


const displayUserDetails = (userData) => {
  document.getElementById("userName").textContent = userData.name || "Not available";
  document.getElementById("userEmail").textContent = userData.email || "Not available";
  document.getElementById("userPhone").textContent = userData.phone || "Not available";
};

auth.onAuthStateChanged(async (user) => {
  if (user) {
    try {
      // Fetch the user details from Firebase Realtime Database
      const userData = await fetchUserDetails(user.uid);
      if (userData) {
        displayUserDetails(userData);  // Display the user details in the dashboard
      }
    } catch (error) {
      console.error("Error fetching user details: ", error);
    }
  } else {
    window.location.href = "login.html";  // Redirect to login if no user is logged in
  }
});

// Get elements for address display, form, and buttons
const addressDetails = document.getElementById('addressDetails');
const addressForm = document.getElementById('addressForm');
const editAddressBtn = document.getElementById('editAddressBtn');

// Show form to edit address when button is clicked
editAddressBtn.addEventListener('click', () => {
  addressDetails.style.display = 'none';  // Hide current address display
  addressForm.style.display = 'block';    // Show the address form
  editAddressBtn.style.display = 'none';  // Hide the "Edit Address" button
});

// Handle the form submission to save the new address
addressForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the input values
  const street = document.getElementById('street').value;
  const city = document.getElementById('city').value;
  const country = document.getElementById('country').value;

  // Update the address on the dashboard
  document.getElementById('userStreet').textContent = street;
  document.getElementById('userCity').textContent = city;
  document.getElementById('userCountry').textContent = country;

  // Hide the form and show the updated address details again
  addressForm.style.display = 'none';
  addressDetails.style.display = 'block';
  editAddressBtn.style.display = 'block';  // Show the "Edit Address" button
});

// Get the logout button element
const logoutBtn = document.getElementById('logoutBtn');

// Add event listener for the logout button
logoutBtn.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      // Redirect to the login page after successful logout
      window.location.href = 'login.html';
    })
    .catch((error) => {
      console.error('Error signing out:', error);
    });
});