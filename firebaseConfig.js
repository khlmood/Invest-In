import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

//initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAGBopXXxJPun6j7iC-A2WOKifFbzVsEEU",
    authDomain: "firstapp-c2ebf.firebaseapp.com",
    projectId: "firstapp-c2ebf",
    storageBucket: "firstapp-c2ebf.appspot.com",
    messagingSenderId: "55993900",
    appId: "1:55993900:web:2a6608577a93e26436d389",
    measurementId: "G-NNPQ8HY2SL"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {persistence: getReactNativePersistence(AsyncStorage)})
export const FIREBASE_DB = getFirestore(FIREBASE_APP);