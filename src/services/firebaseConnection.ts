import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCQB7bDcErF5-qdliHCswnB3RBlOaDKLdw",
  authDomain: "coolstaks-17fb1.firebaseapp.com",
  projectId: "coolstaks-17fb1",
  storageBucket: "coolstaks-17fb1.appspot.com",
  messagingSenderId: "646408160711",
  appId: "1:646408160711:web:a3bf9406bf7733aac005e2"
};


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)


export {db};