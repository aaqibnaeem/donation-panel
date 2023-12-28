import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBW37jUhG1pDWZx1TBTgokt5Cy2qm9hvQU",
  authDomain: "rntodojs.firebaseapp.com",
  databaseURL: "https://rntodojs-default-rtdb.firebaseio.com",
  projectId: "rntodojs",
  storageBucket: "rntodojs.appspot.com",
  messagingSenderId: "786446331979",
  appId: "1:786446331979:web:05909e6a5593a76628ddce",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
