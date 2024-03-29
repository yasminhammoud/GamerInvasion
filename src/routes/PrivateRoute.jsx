import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../contexts/UserAuthContext";

// Verifica si el usuario ha iniciado sesión 
// y su correo ha sido válido para darle acceso a las 
// páginas privadas

export default function PrivateRoute({ children }) {

  const { currentUser } = useUserAuth()
  if (!currentUser) {
    return <Navigate to='/acceder' replace />
  }
  else if (!currentUser?.emailVerified) {
    return <Navigate to='/verificacion-de-correo' replace />
  }

  return children
}