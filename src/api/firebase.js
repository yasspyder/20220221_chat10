import firebase from "firebase";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBS-24e5tp-th7Jied531AjNwX0Pt6KvuA",
  authDomain: "gb6-chat.firebaseapp.com",
  databaseURL:
    "https://gb6-chat-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gb6-chat",
  storageBucket: "gb6-chat.appspot.com",
  messagingSenderId: "502252066850",
  appId: "1:502252066850:web:e5171d726e801b80dcd27b",
  measurementId: "G-X52JGLWCX0",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
