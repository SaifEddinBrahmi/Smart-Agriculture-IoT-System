//config/firebase.jsx
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCEshRawkNgB_YW8gBXaFJlcuw64R7kBXQ",
  authDomain: "mybase-d814f.firebaseapp.com",
  projectId: "mybase-d814f",
  databaseURL: "https://mybase-d814f-default-rtdb.firebaseio.com/",
  storageBucket: "mybase-d814f.appspot.com",
  messagingSenderId: "58854373715",
  appId: "1:58854373715:web:d56895ac95709010f349a6",
  measurementId: "G-C7ZT4L21HQ"
};

const app = initializeApp(firebaseConfig);
const database=getDatabase(app);
const auth = getAuth(app);
export {database, auth};

