import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbT8LEBufMJy5E4UcoTE1d0TOZvIjemjI",
  authDomain: "gamer-prueba2.firebaseapp.com",
  projectId: "gamer-prueba2",
  storageBucket: "gamer-prueba2.appspot.com",
  messagingSenderId: "768154140398",
  appId: "1:768154140398:web:1b4075b2575bcb2df27dff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
