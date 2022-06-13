// import React from "react";
// import { useAuth } from "../contexts/UserAuthContext";
// import { Navigate } from "react-router-dom";

// const RutaProtegida = ({ children }) => {

//     const { usuario } = useAuth();

//     if (usuario) {
//         return children;
//     } else {
//         return <Navigate replace to="/log-in" />
//     }

// }

// export default RutaProtegida;

import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../contexts/UserAuthContext";

const RutaPrivada = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/log-in" />;
  }
  return children;
};

export default RutaPrivada;