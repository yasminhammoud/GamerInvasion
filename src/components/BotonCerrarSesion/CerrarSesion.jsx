import React from "react";
import { auth } from "../../firebase/firebaseconfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const BotonCerrarSesion = () => {

    const navigate = useNavigate();

    const cerrarSesion = async () => {

        try {
            await signOut(auth);
            navigate("/store");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button onClick={cerrarSesion}>
                <p>Log-Out</p>
            </button>
        </div>
    );
}

export default BotonCerrarSesion;


