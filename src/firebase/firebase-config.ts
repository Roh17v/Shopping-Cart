// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAN-9cmMjLG0WZmNsINOfcLszk__PkSnTA",
  authDomain: "ecommerce-platform-e6dae.firebaseapp.com",
  projectId: "ecommerce-platform-e6dae",
  storageBucket: "ecommerce-platform-e6dae.appspot.com",
  messagingSenderId: "152318088640",
  appId: "1:152318088640:web:7d0546ccab145588326425",
  measurementId: "G-2YFTPDBBJ6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
