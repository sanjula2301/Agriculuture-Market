import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBX9RiH5e5t9x6FdyQ0dyacKQb5DDkODHM",
  authDomain: "lankaagri-5042f.firebaseapp.com",
  projectId: "lankaagri-5042f",
  storageBucket: "lankaagri-5042f.firebasestorage.app",
  messagingSenderId: "795230004585",
  appId: "1:795230004585:web:581027dd2a80399fe109f8",
  measurementId: "G-V8JX5VYBN0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
