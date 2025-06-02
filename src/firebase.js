// Import the functions you need from the SDKs you need
import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";

import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
 } from "firebase/auth";

import { 
    addDoc,
    collection,
    getFirestore
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyApi1LFNPW6EIM4eRXsVhNtxHnW0ITk69k",
  authDomain: "netflix-clone-23c97.firebaseapp.com",
  projectId: "netflix-clone-23c97",
  storageBucket: "netflix-clone-23c97.firebasestorage.app",
  messagingSenderId: "262771394603",
  appId: "1:262771394603:web:aa20741ad5782e1bda026e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'user'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    } catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
        // alert(error)
    }
}

const signIn = async (email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password)
    }catch(error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
        // alert(error)
    }
}

const logOut = async () =>{
    await signOut(auth)
}

export { db, auth, signIn, signUp, logOut}