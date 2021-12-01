import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBW66xI9WFPdZiWwCW-TGy9ApXKtzbwElM",
  authDomain: "twitter-clone-af3e9.firebaseapp.com",
  projectId: "twitter-clone-af3e9",
  storageBucket: "twitter-clone-af3e9.appspot.com",
  messagingSenderId: "1008784175253",
  appId: "1:1008784175253:web:00de888bf87c516e21eb9c",
  measurementId: "G-3EYTPK9RXH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
