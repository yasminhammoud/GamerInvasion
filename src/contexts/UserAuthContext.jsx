import { createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseconfig";
import { getUserByID } from "../controllers/Users"
import { useEffect, useState } from "react";

const userAuthContext = createContext();

// Envuelve el resto de los componentes en App para que el contexto
// del usuario sea globlal
export function UserAuthContextProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      getUserByID(user.uid).then((response) => {
        setCurrentUser({
          ...user,
          name: response?.Nombre,
          address: response?.Direccion,
          phone: response?.Telefono,
          discount: response?.Descuento,
          nextAttempt: response?.ProximoIntento.toDate()
        })
      })
    });

  }, []);

  return (
    <userAuthContext.Provider
      value={{ currentUser, setCurrentUser, timeActive, setTimeActive }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

// Devuelve el valor del contexto del usuario (sus atributos)
// Nos ayuda conocer si el usuario ha iniciado sesión o no
export function useUserAuth() {
  return useContext(userAuthContext);
}