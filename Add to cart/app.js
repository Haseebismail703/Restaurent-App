// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
  
    apiKey: "AIzaSyD0FjVwlw_dnXudam_YmvtG-yipsLD8efg",
    authDomain: "project-1-64704.firebaseapp.com",
    databaseURL: "https://project-1-64704-default-rtdb.firebaseio.com",
    projectId: "project-1-64704",
    storageBucket: "project-1-64704.appspot.com",
    messagingSenderId: "658759651298",
    appId: "1:658759651298:web:26348013c0010a765cf3bb",
    measurementId: "G-XV94SF7FXY"






};
// firebase.initializeApp(firebaseConfig);

// Get Firestore instance
// const firestore = firebase.firestore();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Get product data from DOM elements
const productId = document.getElementById("product-id");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");

// Add click event listener to button
const addToCartBtn = document.getElementById("add-to-cart-btn");
addToCartBtn.addEventListener("click", async () => {
  // Create cart object
  const cartItem = {
    productId: productId.value,
    productName: productName.value,
    productPrice: productPrice.value,
    quantity: 1, // Set default quantity
  };

  // Get current user ID
  const user = firebase.auth().currentUser;
  const userId = user ? user.uid : null;

  // Add cart item to user's cart collection
  if (userId) {
    await firestore.collection("users").doc(userId).collection("cart").add(cartItem);
    alert("Product added to cart!");
  } else {
    alert("Please log in to add items to cart");
  }
});
