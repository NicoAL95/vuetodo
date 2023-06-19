import firebase from 'firebase'
import { ref, unmounted } from 'vue'

const config = {
    apiKey: "AIzaSyBPrRZm025ocjnjJFofuH-cFAPHKIa0nLg",
    authDomain: "vuetodo-35b60.firebaseapp.com",
    projectId: "vuetodo-35b60",
    storageBucket: "vuetodo-35b60.appspot.com",
    messagingSenderId: "182087231855",
    appId: "1:182087231855:web:990ec6b4a94f12d5aaa09a"
}

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const userCollection = db.collection('tolists')