// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
// Importação do Firestore
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNh_saexDZe4tA4ULCGKPPzx_Zk_ltxfQ",
  authDomain: "login-meddocs-expo.firebaseapp.com",
  projectId: "login-meddocs-expo",
  storageBucket: "login-meddocs-expo.firebasestorage.app",
  messagingSenderId: "1087997202171",
  appId: "1:1087997202171:web:0a97320aef7cf8c6e7ea5e"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);