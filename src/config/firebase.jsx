import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrwd-2HZn8H_8akvGzXC6MrWNl1nLnstw",
  authDomain: "ecommerce-e390c.firebaseapp.com",
  projectId: "ecommerce-e390c",
  storageBucket: "ecommerce-e390c.firebasestorage.app",
  messagingSenderId: "143106767622",
  appId: "1:143106767622:web:8d749685eb5a9b7a67bc87",
  measurementId: "G-NZ3Y0HNYC4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
