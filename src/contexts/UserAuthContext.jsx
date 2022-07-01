import { createContext, useContext} from "react";

const userAuthContext = createContext();

// Envuelve el resto de los componentes en App para que el contexto
// del usuario sea globlal
export function UserAuthContextProvider({ children, value }) {
  return (
    <userAuthContext.Provider
      value={value}
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