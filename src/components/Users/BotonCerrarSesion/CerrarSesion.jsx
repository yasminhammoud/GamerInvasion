import React from "react";
import { auth } from "../../../firebase/firebaseconfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../../contexts/UserAuthContext";
// Botón de cerrar sesión que se encuentra en el navbar
// cuando un usuario ya ha iniciado sesión exitosamente

const BotonCerrarSesion = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUserAuth();

  const cerrarSesion = async () => {
    try {
      await signOut(auth).then(() => {
        setCurrentUser(null)
      }
      )
        .catch(
          (err) => console.log(err)
        );
      // Navigate to landing page
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      className="my-2"
      variant="cyan"
      style={{ fontFamily: "EvilEmpire" }}
      onClick={cerrarSesion}
    >
      Salir
    </Button>
  );
};

export default BotonCerrarSesion;
