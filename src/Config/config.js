import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

export const DB_CONFIG = {
    apiKey: "AIzaSyBgW-MEVDdaP-0wweWh-soMQf8qDXRtPMU",
    authDomain: "coffee-400.firebaseapp.com",
    databaseURL: "https://coffee-400.firebaseio.com",
    projectId: "coffee-400",
    storageBucket: "coffee-400.appspot.com",
    messagingSenderId: "72483298608"
};

// Инициализируем firebase приложение.
export const app = firebase.initializeApp(DB_CONFIG); 

// Инициалиируем базу данных.
export const database = firebase.firestore();