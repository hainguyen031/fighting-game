// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFuAvY-RNDYAJvBSYcu2rvCtQNT8SYIeo",
  authDomain: "fighting-game-e2e9b.firebaseapp.com",
  projectId: "fighting-game-e2e9b",
  storageBucket: "fighting-game-e2e9b.appspot.com",
  messagingSenderId: "65792403555",
  appId: "1:65792403555:web:b9f531ca32693d2d32f056",
  measurementId: "G-C46VFJBWVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);