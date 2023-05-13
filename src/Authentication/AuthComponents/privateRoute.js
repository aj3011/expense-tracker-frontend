import React, { useContext } from "react";

import { Navigate } from "react-router-dom";
import AuthContext from "../Context/authContext";

export default function PrivateRoute({ children }) {
  //We first check if there's any user logged in previously. Because refreshing the page would reset the state but not delete the localstorage entry
  // The localstorage entry can only be deleted when a user logs out.
  // so if an entry's still there, it means the user never logged out
  const lastLoggedUser = JSON.parse(localStorage.getItem("isLoggedIn"));

  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return lastLoggedUser ? children : <Navigate to="/login" />;

  return currentUser ? children : <Navigate to="/login" />;
}
