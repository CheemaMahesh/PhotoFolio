import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkhzgUGpN4C_e0ntNUTICs75btK4S6tRo",
  authDomain: "photofolio-594ab.firebaseapp.com",
  projectId: "photofolio-594ab",
  storageBucket: "photofolio-594ab.appspot.com",
  messagingSenderId: "329154779282",
  appId: "1:329154779282:web:ae8c1e578b0bcead08ee4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);