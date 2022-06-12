import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children }) => {

    const { usuario } = useAuth();

    if (usuario) {
        return children
    } else {
        return <Navigate replace to="/log-in" />
    }

}

export default RutaProtegida;