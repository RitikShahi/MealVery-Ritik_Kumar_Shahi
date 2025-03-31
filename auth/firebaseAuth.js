import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDn-Uiu4oyvZ3lyRSbYKBy1vScBqNwc1I",
    authDomain: "swiggy-65839.firebaseapp.com",
    projectId: "swiggy-65839",
    storageBucket: "swiggy-65839.appspot.com",
    messagingSenderId: "815609000829",
    appId: "1:815609000829:web:a796630a698c8e89efd214",
    measurementId: "G-0NNL27D8B6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and GoogleAuthProvider
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
