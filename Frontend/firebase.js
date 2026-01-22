// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "realstate-285e4.firebaseapp.com",
  projectId: "realstate-285e4",
  storageBucket: "realstate-285e4.firebasestorage.app",
  messagingSenderId: "286818181172",
  appId: "1:286818181172:web:f0332131d2f63a959eaa61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
