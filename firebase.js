/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCS6G8dOf7dV5OgOZ_1LtR6uzL5KnUAQqY",
    authDomain: "graph-and-co-react.firebaseapp.com",
    databaseURL:
        "https://graph-and-co-react-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "graph-and-co-react",
    storageBucket: "graph-and-co-react.appspot.com",
    messagingSenderId: "675038107018",
    appId: "1:675038107018:web:f949930d2f33017742a473",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
