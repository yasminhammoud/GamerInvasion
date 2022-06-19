import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../contexts/UserAuthContext";

export default function PrivateRoute({children}) {
  
  const {currentUser} = useUserAuth()

  if(!currentUser?.emailVerified){
    return <Navigate to='/acceder' replace/>
  }

  return children
}