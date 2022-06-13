import React from "react";
import { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseconfig";
import { onAuthStateChanged } from 'firebase/auth';


const AuthContext = React.createContext();


//Hook para acceder al contexto 

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {

    const [usuario, setUsuario] = useState();
    const [cargando, setCargando] = useState(true);







    useEffect(() => {
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
            setUsuario(usuario);
            setCargando(false);
        });

        return cancelarSuscripcion
    }, []);




    


    return (
        <AuthContext.Provider value={{ usuario: usuario }}>
            {!cargando && children}
        </AuthContext.Provider>
    );

};


export { AuthProvider, AuthContext, useAuth };