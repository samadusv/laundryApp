import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig ={
    apiKey:"AIzaSyAjUSwof_uV6nVJUrQEK9JgbeoaSuBU4_Q",
    authDomain:"laundryapp-7a4a8.firebaseapp.com",
    projectId:"laundryapp-7a4a8",
    storageBucket:"laundryapp-7a4a8.appspot.com",
    messagingSenderId:"777100604099",
    appId:"1:777100604099:android:819704184951455d13e876"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
export {auth,db}