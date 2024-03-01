import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "firebase/auth";
import { getFirestore,collection, addDoc,doc, setDoc, getDocs, deleteDoc,updateDoc  } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDZqeb9KRKGu-rije1k-7feykARPvq_1p8",
    authDomain: "expense-tracker-1d1c4.firebaseapp.com",
    projectId: "expense-tracker-1d1c4",
    storageBucket: "expense-tracker-1d1c4.appspot.com",
    messagingSenderId: "345649403684",
    appId: "1:345649403684:web:ef6823fb40566a7cca05b1",
    measurementId: "G-D8E3H1T1LZ"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export{
    auth,
    createUserWithEmailAndPassword,
    db,
    collection,
    addDoc,
    doc,
    setDoc,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    getDocs,
    deleteDoc,
    updateDoc,
}