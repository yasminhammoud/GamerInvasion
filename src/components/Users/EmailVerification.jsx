import { useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebaseconfig";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../contexts/UserAuthContext";
import { Button, Card } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { getUserByID } from "../../controllers/Users"

function VerifyEmail() {

  const { currentUser, setCurrentUser } = useUserAuth();

  const [time, setTime] = useState(60);
  const { timeActive, setTimeActive } = useUserAuth();
  const navigate = useNavigate();

  // Al asegurarse de que el correo del usuario ha sido verificado
  // se redirigé al la tienda, en caso contrario, el usuario
  // el temporizador se puede resetear para volver enviar el correo
  // hasta que esté verificado.

  const setUserWithVerification = async (currentUser) => {

    getUserByID(currentUser.uid).then((response) => {
      setCurrentUser({
        ...currentUser,
        name: response?.Nombre,
        address: response?.Direccion,
        phone: response?.Telefono,
        discount: response?.Descuento,
        nextAttempt: response?.ProximoIntento.toDate(),
        emailVerified: true
      })
    })

  };


  useEffect(() => {
    const interval = setInterval(() => {
      auth.currentUser
        ?.reload()
        .then(() => {
          if (auth.currentUser?.emailVerified) {
            clearInterval(interval);

            setUserWithVerification(auth.currentUser).then(() => {

              toast.success("Se ha verificado exitosamente")
              navigate("/tienda");
            }

            )
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 1000);
  }, [navigate, auth.currentUser]);

  // Temporizador para el reenvio de correo de verificación
  useEffect(() => {
    let interval = null;
    if (timeActive && time !== 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive]);

  // ReEnvío de correo de verificación
  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setTimeActive(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="container-log-in">
      <Card className="card-log-in" bg="gray">
        <Card.Body className="cardback">
          <Card.Title
            className="cardtitle"
            style={{
              color: "rgb(131, 249, 255)",
              textAlign: "center",
              fontFamily: "EvilEmpire",
              letterSpacing: "2px",
              fontSize: "2rem",
            }}
          >
            Verificación de correo electrónico
          </Card.Title>

          <Card.Text className="text-center" style={{ color: "white" }}>
            <p>
              <strong>Una verificación de correo se ha enviado a:</strong>
              <br />
              <span>{currentUser?.email}</span>
            </p>
            <p>Siga las instrucciones en el correo para verificar su cuenta</p>
            <Button
              variant="cyan"
              onClick={resendEmailVerification}
              disabled={timeActive}
            >
              <strong>Reenviar correo </strong> {timeActive && time}
            </Button>
            <br />
            <br />
            <p style={{ color: "yellow" }}>
              ¡No olvide revisar su correo spam!
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default VerifyEmail;
