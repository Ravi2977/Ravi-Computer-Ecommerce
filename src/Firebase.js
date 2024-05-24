// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyChJJeG0F__h4CYTMVsdXfCGjOV59xPhwc",
  authDomain: "ravi-computer.firebaseapp.com",
  projectId: "ravi-computer",
  storageBucket: "ravi-computer.appspot.com",
  messagingSenderId: "728081357320",
  appId: "1:728081357320:web:2a3354f8dccae746928fbd",
  measurementId: "G-1B75DWML62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app)