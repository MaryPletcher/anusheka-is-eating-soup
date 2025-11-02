// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQXk42KgEESULcPns1ZB0PcgjqG-1Le60",
  authDomain: "anusheka-is-eating-soup.firebaseapp.com",
  projectId: "anusheka-is-eating-soup",
  storageBucket: "anusheka-is-eating-soup.firebasestorage.app",
  messagingSenderId: "115865409427",
  appId: "1:115865409427:web:734c5375617faa193dfa66",
  measurementId: "G-KY367QM5KX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export storage and database
export const storage = getStorage(app);
export const database = getDatabase(app);