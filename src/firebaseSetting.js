import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import * as firestore from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGEIN_ID,
    appId: process.env.REACT_APP_APP_ID,
};

initializeApp(firebaseConfig);
export const authService = getAuth();
export const createUser = createUserWithEmailAndPassword;
export const signInEmail = signInWithEmailAndPassword;
export const checkAuthState = onAuthStateChanged;
export const githubLogin = GithubAuthProvider;
export const googleLogin = GoogleAuthProvider;
export const popUp = signInWithPopup;
export const logOut = signOut;
export const dbService = firestore;
export const db = firestore.getFirestore();
