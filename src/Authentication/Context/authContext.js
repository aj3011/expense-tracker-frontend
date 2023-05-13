import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";

const AuthContext = React.createContext();

export function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const lastLoggedInUser = JSON.parse(localStorage.getItem("isLoggedIn"));

  function signUp(email, password, firstName, lastName, currency) {
    const response = auth.createUserWithEmailAndPassword(email, password);
    response.then(credentials => {
      return db.collection("users").doc(credentials.user.uid).set({
        firstName,
        lastName,
        currency
      });
    });
    return response;
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    localStorage.removeItem("isLoggedIn");
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  //firebase has this method to notify whenver the auth state changes. so we will update the user accordingly
  useEffect(() => {
    //when the login component mounts, this useEffect hook will run and start listening for auth state changes.
    //After login, the component has to unmount.
    //To help with this, the onAuthStateChanged method returns a unsubscribe method that will help us unsubscribe to listening to the onAuthStateChange method
    const unsubscribe = auth.onAuthStateChanged(user => {
      localStorage.setItem("isLoggedIn", JSON.stringify(user));
      setCurrentUser(user);
    });

    setLoading(false);
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    lastLoggedInUser
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
