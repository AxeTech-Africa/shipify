import { auth } from './firebase.js';  // Import Firebase auth
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';

// Check if the account menu and account icon exist on the page before proceeding
const accountMenu = document.getElementById('account-menu');
const accountIcon = document.getElementById('account-icon');
const userNameElement = document.getElementById('user-name');  // Assuming you're displaying the username somewhere

// Function to update the account menu
function updateAccountMenu(user) {
  if (user) {
    // User is logged in, show dashboard and logout options
    if (accountMenu) {
      accountMenu.innerHTML = `
        <li><a href="dashboard.html">Dashboard</a></li>
      `;
    }

    // Add logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
          window.location.href = 'login.html';  // Redirect to login page after logging out
        }).catch((error) => {
          console.error('Error signing out:', error);
        });
      });
    }
  } else {
    // User is not logged in, show login and signup options
    if (accountMenu) {
      accountMenu.innerHTML = `
        <li><a href="signup.html">Sign up</a></li>
        <li><a href="login.html">Login</a></li>
      `;
    }
  }
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  updateAccountMenu(user);

  if (user && accountIcon) {
    // If the user is logged in, display their name next to the icon
    const userName = user.displayName || user.email.split('@')[0];  // Use displayName if available, else use part of email before "@"
    
    if (userNameElement) {
      userNameElement.textContent = userName;  // Update the span with the user's name
    }

    // Optionally, link to the user's dashboard
    if (accountIcon) {
      accountIcon.setAttribute('href', 'dashboard.html');
    }
  } else {
    // If the user is not logged in, leave the name blank and link to login page
    if (userNameElement) {
      userNameElement.textContent = '';
    }
    if (accountIcon) {
      accountIcon.setAttribute('href', 'login.html');
    }
  }
});


// Mock data for testing
const mockOrders = {
  "123456": {
    status: "Shipped",
    expectedDeliveryDate: "2024-12-20",
    trackingUpdates: [
      { date: "2024-12-10", update: "Order processed at warehouse" },
      { date: "2024-12-11", update: "Shipped from origin" },
      { date: "2024-12-13", update: "Arrived at customs" }
    ]
  },
  "654321": {
    status: "Packaging",
    expectedDeliveryDate: "2024-12-25",
    trackingUpdates: [
      { date: "2024-12-10", update: "Order placed" },
      { date: "2024-12-11", update: "Preparing for shipment" }
    ]
  }
};

// Function to fetch order details
const trackOrder = (trackingNumber) => {
  const orderData = mockOrders[trackingNumber];
  if (orderData) {
    displayOrderStatus(orderData);
  } else {
    displayError("Order not found. Please check your tracking number.");
  }
};

// Function to display order status
const displayOrderStatus = (order) => {
  const orderStatusDiv = document.getElementById('orderStatus');
  const updates = order.trackingUpdates.map(update => `<li>${update.date}: ${update.update}</li>`).join('');
  
  orderStatusDiv.innerHTML = `
    <p><strong>Status:</strong> ${order.status}</p>
    <p><strong>Expected Delivery Date:</strong> ${order.expectedDeliveryDate}</p>
    <ul><strong>Tracking Updates:</strong> ${updates}</ul>
  `;
};

// Function to display an error message
const displayError = (message) => {
  const orderStatusDiv = document.getElementById('orderStatus');
  orderStatusDiv.innerHTML = `<p class="error">${message}</p>`;
};

// Add event listener for the Track Order button
document.getElementById('trackOrderBtn').addEventListener('click', () => {
  const trackingInput = document.getElementById('trackingInput').value.trim();
  if (trackingInput) {
    trackOrder(trackingInput);
  } else {
    displayError("Please enter a tracking number.");
  }
});
