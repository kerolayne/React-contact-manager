// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzW7UliP2NxI8jSWn_hQ1n90iGsOasvCI",
  authDomain: "gestor-de-contatos.firebaseapp.com",
  projectId: "gestor-de-contatos",
  storageBucket: "gestor-de-contatos.firebasestorage.app",
  messagingSenderId: "894966763634",
  appId: "1:894966763634:web:0da06dab7ade03df1672eb",
  measurementId: "G-2DX34N40NB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);