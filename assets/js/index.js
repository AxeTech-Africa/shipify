import { auth } from './firebase.js';  // Import Firebase auth
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';

// Get the account menu element
const accountMenu = document.getElementById('account-menu');

// Function to update the account menu
function updateAccountMenu(user) {
  if (user) {
    // User is logged in, show dashboard and logout options
    accountMenu.innerHTML = `
      <li><a href="dashboard.html">Dashboard</a></li>
      <li><a href="#" id="logoutBtn">Logout</a></li>
    `;

    // Add logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
      signOut(auth).then(() => {
        window.location.href = 'login.html';  // Redirect to login page after logging out
      }).catch((error) => {
        console.error('Error signing out:', error);
      });
    });
  } else {
    // User is not logged in, show login and signup options
    accountMenu.innerHTML = `
      <li><a href="signup.html">Sign up</a></li>
      <li><a href="login.html">Login</a></li>
    `;
  }
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  updateAccountMenu(user);
});
