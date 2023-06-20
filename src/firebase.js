import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBPrRZm025ocjnjJFofuH-cFAPHKIa0nLg",
    authDomain: "vuetodo-35b60.firebaseapp.com",
    projectId: "vuetodo-35b60",
    storageBucket: "vuetodo-35b60.appspot.com",
    messagingSenderId: "182087231855",
    appId: "1:182087231855:web:990ec6b4a94f12d5aaa09a"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

// Collection name
const collectName = "tolists"

// Create Data
const addData = async ( content, category, status, time ) => {
    try {
        const docRef = await addDoc(collection(db, collectName), {
            content: content,
            category: category,
            done: status,
            createdAt: time
        })
        console.log("Document written with ID: ", docRef.id);
    } catch (e){
        console.log("Error adding document: ", e);
    }
}

// Delete Data

// Read Data
const readData = async () => {
    const queryDatas = await getDocs(collection(db, collectName))
    const allDatas = []

    queryDatas.forEach((doc) => {
        allDatas.push({ id: doc.id, data: doc.data() })
    })
    return allDatas
}

export { addData, readData }