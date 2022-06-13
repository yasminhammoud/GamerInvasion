// import React from "react";
// import { useContext, useState, useEffect } from "react";
// import { auth } from "../firebase/firebaseconfig";
// import { onAuthStateChanged } from 'firebase/auth';


// const AuthContext = React.createContext();


// //Hook para acceder al contexto 

// const useAuth = () => {
//     return useContext(AuthContext)
// }

// const AuthProvider = ({ children }) => {

//     const [usuario, setUsuario] = useState();
//     const [cargando, setCargando] = useState(true);

//     useEffect(() => {
//         const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
//             setUsuario(usuario);
//             setCargando(false);
//         });

//         return cancelarSuscripcion
//     }, []);   

//     return (
//         <AuthContext.Provider value={{ usuario: usuario }}>
//             {!cargando && children}
//         </AuthContext.Provider>
//     );

// };

// export { AuthProvider, AuthContext, useAuth };

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { auth } from "../firebase/firebaseconfig";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}