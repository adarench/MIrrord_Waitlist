// Import the Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase configuration (ONLY thing we need to keep)
const firebaseConfig = {
  apiKey: "AIzaSyBG4AM8qs0LhDP5AMxSHtaNjd-BOKTG9aM",
  authDomain: "mirrordwaitlist.firebaseapp.com",
  projectId: "mirrordwaitlist",
  storageBucket: "mirrordwaitlist.firebasestorage.app",
  messagingSenderId: "84273478294",
  appId: "1:84273478294:web:731df65e9f48ecbc3660b7",
  measurementId: "G-HJMRHDCVV6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Simple function to add a user to the waitlist
export const addToWaitlist = async (userData) => {
  try {
    // Add timestamp to the data
    const dataWithTimestamp = {
      ...userData,
      timestamp: new Date()
    };
    
    // Add to the "waitlist" collection
    const docRef = await addDoc(collection(db, "waitlist"), dataWithTimestamp);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document:", error);
    return { success: false, error };
  }
};