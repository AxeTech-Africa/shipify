import { auth, firestore } from './firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

// Elements
const userEmail = document.getElementById('user-email');
const userUid = document.getElementById('user-uid');
const logoutBtn = document.getElementById('logout-btn');
const ordersList = document.getElementById('orders-list');
const addressesList = document.getElementById('addresses-list');

// Check user authentication state
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Display user info
    userEmail.textContent = user.email;
    userUid.textContent = user.uid;

    // Fetch user data (orders, addresses)
    await fetchUserOrders(user.uid);
    await fetchUserAddresses(user.uid);
  } else {
    // Redirect to login if user is not authenticated
    window.location.href = 'login.html';
  }
});

// Fetch user's orders from Firestore
async function fetchUserOrders(userId) {
  const ordersRef = collection(firestore, 'orders');
  const q = ordersRef.where('userId', '==', userId); // Fetch orders for this user
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      const orderData = doc.data();
      const orderDiv = document.createElement('div');
      orderDiv.innerHTML = `
        <p>Order ID: ${orderData.orderId}</p>
        <p>Status: ${orderData.status}</p>
        <p>Total: ${orderData.totalAmount}</p>
      `;
      ordersList.appendChild(orderDiv);
    });
  } else {
    ordersList.innerHTML = '<p>No orders found.</p>';
  }
}

// Fetch user's saved addresses from Firestore
async function fetchUserAddresses(userId) {
  const addressesRef = collection(firestore, 'addresses');
  const q = addressesRef.where('userId', '==', userId); // Fetch addresses for this user
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      const addressData = doc.data();
      const addressDiv = document.createElement('div');
      addressDiv.innerHTML = `
        <p>Address: ${addressData.address}</p>
        <p>City: ${addressData.city}</p>
        <p>Country: ${addressData.country}</p>
      `;
      addressesList.appendChild(addressDiv);
    });
  } else {
    addressesList.innerHTML = '<p>No saved addresses found.</p>';
  }
}

// Log out the user
logoutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth);
    console.log('User logged out');
    window.location.href = 'login.html'; // Redirect to login page after logout
  } catch (error) {
    console.error('Error logging out:', error.message);
  }
});
