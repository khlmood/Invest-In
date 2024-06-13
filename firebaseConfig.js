import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';

//initialize Firebase
const firebaseConfig = config.firebaseConfig;

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {persistence: getReactNativePersistence(AsyncStorage)})
export const FIREBASE_DB = getFirestore(FIREBASE_APP);