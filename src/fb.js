import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDeeZFx-pn8sjCE3QclyE1528JSr2lDcFY",
  authDomain: "todo-project-5dd3e.firebaseapp.com",
  projectId: "todo-project-5dd3e",
  storageBucket: "todo-project-5dd3e.appspot.com",
  messagingSenderId: "851367932442",
  appId: "1:851367932442:web:4b5c57615896aa9e3617a3",
  measurementId: "G-3667G68X6N",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;
