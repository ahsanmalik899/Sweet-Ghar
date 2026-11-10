import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBclPIaJMC0GqHZ89GQFN0jI7n67e6Wk4g",
  authDomain: "sweetghar-c8520.firebaseapp.com",
  projectId: "sweetghar-c8520",
  storageBucket: "sweetghar-c8520.firebasestorage.app",
  messagingSenderId: "798901347695",
  appId: "1:798901347695:web:3c2d1fdb7caa334e2fb49a"
};

const app=initializeApp(firebaseConfig);

export const db=getFirestore(app);