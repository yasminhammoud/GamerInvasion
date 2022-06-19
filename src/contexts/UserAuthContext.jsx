import { createContext, useContext} from "react";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children, value }) {
  return (
    <userAuthContext.Provider
      value={value}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}