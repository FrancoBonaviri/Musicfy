import firebase from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyAcK6PGlQEOhhQHR9eKlJ6GAxTOGKjX_Ys",
    authDomain: "musicfy-francodev.firebaseapp.com",
    databaseURL: "https://musicfy-francodev-default-rtdb.firebaseio.com",
    projectId: "musicfy-francodev",
    storageBucket: "musicfy-francodev.appspot.com",
    messagingSenderId: "928836156527",
    appId: "1:928836156527:web:b0d8c2c76c3c8e5254619a"
};


export default firebase.initializeApp(firebaseConfig);


