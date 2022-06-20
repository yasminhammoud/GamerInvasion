import React from "react";
import { auth } from "../../../firebase/firebaseconfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const BotonCerrarSesion = () => {
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
    className="my-2"
      variant="cyan"
      style={{ fontFamily: "EvilEmpire"}}
      onClick={cerrarSesion}
    >
      Salir
    </Button>
  );
};

export default BotonCerrarSesion;
