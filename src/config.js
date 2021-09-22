import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBaX8tNR8l6g596VD30jXrb8sqcIay1OQg",
    authDomain: "certify-4bf9a.firebaseapp.com",
    projectId: "certify-4bf9a",
    storageBucket: "certify-4bf9a.appspot.com",
    messagingSenderId: "943355489638",
    appId: "1:943355489638:web:6e608813cb8088a39e6ca7",
    measurementId: "G-Y6GC2C9V7P"
}

export const app = initializeApp(firebaseConfig);

// TODO: change url to env var
export const env = {
    url: "http://localhost:5000"
    //url: "https://rajasekar-certify-backend.herokuapp.com"
}