// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGAdqDa7j-mkzk3V9Yph7aJUwDq0kS2GE",
  authDomain: "otaku-gpt.firebaseapp.com",
  projectId: "otaku-gpt",
  storageBucket: "otaku-gpt.firebasestorage.app",
  messagingSenderId: "444058698403",
  appId: "1:444058698403:web:ed3f4d574829bd7661f516",
  measurementId: "G-R8KY8TCFWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();