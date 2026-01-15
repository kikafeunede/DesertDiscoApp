// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB_RFHKGiD5tLrelEn7lfnNYqsHzOtIh5c",
  authDomain: "desert-disco-b69c2.firebaseapp.com",
  projectId: "desert-disco-b69c2",
  storageBucket: "desert-disco-b69c2.firebasestorage.app",
  messagingSenderId: "912920218764",
  appId: "1:912920218764:web:61a0fd5639f69a6cd6ffa9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const storage = getStorage(app);
