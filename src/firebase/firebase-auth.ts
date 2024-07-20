// src/firebase/firebase-auth.ts

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import {app} from "./firebase-config";

const auth = getAuth(app);

export const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

export const signOutUser = () => signOut(auth);

export const onAuthStateChange = (callback: (user: any) => void) => onAuthStateChanged(auth, callback);
