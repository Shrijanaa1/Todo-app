
import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyBfUIfj9gJgZfsTS1Etg39Th1ij91o-IBg",
        authDomain: "to-do-app-1295a.firebaseapp.com",
        projectId: "to-do-app-1295a",
        storageBucket: "to-do-app-1295a.appspot.com",
        messagingSenderId: "65698594837",
        appId: "1:65698594837:web:dacef581d20ca613280e1c",
        measurementId: "G-SP6SDRY1K2"

});

const db = firebaseApp.firestore();

export default db; 