import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBilfGfooKCUeHPrP_sWmexFbM5Mrt-wBk",
  authDomain: "expense-tracker-ashrey.firebaseapp.com",
  databaseURL: "https://expense-tracker-ashrey-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-ashrey",
  storageBucket: "expense-tracker-ashrey.appspot.com",
  messagingSenderId: "694771305427",
  appId: "1:694771305427:web:225415dd634499c30b7d26"
});

//we use this exported auth module in authContext.js to faciliate user login
export const auth = app.auth();
export const db = firebase.firestore();
export default app;
