import { auth, database, fetchUserDetails, updateUserAddress } from "./firebase.js";

// Function to display user details (including the shipping address)
const displayUserDetails = (userData) => {
  document.getElementById("userName").textContent = userData.name || "Not available";
  document.getElementById("userEmail").textContent = userData.email || "Not available";
  document.getElementById("userPhone").textContent = userData.phone || "Not available";
  
  // Display the address details if available
  if (userData.address) {
    document.getElementById("userCountry").textContent = userData.address.country || "Not available";
    document.getElementById("userCity").textContent = userData.address.city || "Not available";
    document.getElementById("userStreet").textContent = userData.address.street || "Not available";
  }
};

// Fetch user data and display on the dashboard when logged in
auth.onAuthStateChanged(async (user) => {
  if (user) {
    // Fetch and display the user's details
    const userData = await fetchUserDetails(user.uid);
    if (userData) {
      displayUserDetails(userData);
    }
  } else {
    window.location.href = "login.html";  // Redirect to login page if not logged in
  }
});

// Event listener to handle editing the address
document.getElementById("editAddressBtn").addEventListener("click", () => {
  // Show the address form
  document.getElementById("addressForm").style.display = "block";
  document.getElementById("addressDetails").style.display = "none";
});

// Event listener to handle address form submission
document.getElementById("addressForm").addEventListener("submit", async (event) => {
  event.preventDefault();  // Prevent form submission from reloading the page

  const newStreet = document.getElementById("street").value.trim();
  const newCity = document.getElementById("city").value.trim();
  const newCountry = document.getElementById("country").value.trim();

  if (newStreet && newCity && newCountry) {
    const user = auth.currentUser; // Get the current user
    const userId = user.uid; // Get the user's UID

    const newAddress = {
      street: newStreet,
      city: newCity,
      country: newCountry
    };

    // Update the user's address in Firebase
    await updateUserAddress(userId, newAddress);

    // Update the address section on the UI
    document.getElementById("userStreet").textContent = newStreet;
    document.getElementById("userCity").textContent = newCity;
    document.getElementById("userCountry").textContent = newCountry;

    // Hide the address form and show the updated address
    document.getElementById("addressForm").style.display = "none";
    document.getElementById("addressDetails").style.display = "block";

    alert("Address updated successfully!");
  } else {
    alert("Please fill out all fields.");
  }
});

// Log out the user
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await auth.signOut();
  window.location.href = "index.html";  // Redirect to homepage after logout
});
