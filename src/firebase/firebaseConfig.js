// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBW66xI9WFPdZiWwCW-TGy9ApXKtzbwElM",
  authDomain: "twitter-clone-af3e9.firebaseapp.com",
  projectId: "twitter-clone-af3e9",
  storageBucket: "twitter-clone-af3e9.appspot.com",
  messagingSenderId: "1008784175253",
  appId: "1:1008784175253:web:00de888bf87c516e21eb9c",
  measurementId: "G-3EYTPK9RXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db