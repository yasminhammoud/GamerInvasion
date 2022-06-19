import { useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebaseconfig";
import { sendEmailVerification } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../contexts/UserAuthContext";
import { Button, Card } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";

function VerifyEmail() {
  const colRef = collection(db, "Usuarios");
  const { currentUser } = useUserAuth();
  const [time, setTime] = useState(60);
  const { timeActive, setTimeActive } = useUserAuth();
  const navigate = useNavigate();

  const {state} = useLocation();
  const {name, email} = state;


  useEffect(() => {

    const addDataToFirestore = async () => {
      try{
        await addDoc(colRef, {
          Nombre: name,
          Email: email,
        });
        toast.success("Se ha registrado exitósamente");
      } catch(error){
        console.log(error);
    }
  }
  
    const interval = setInterval(() => {
      currentUser
        ?.reload()
        .then(() => {

          if (currentUser?.emailVerified) {
            clearInterval(interval);
            addDataToFirestore();
            navigate("/tienda");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 1000);
  }, [navigate, currentUser]);

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
            <p style={{ color: "yellow" }}>¡No olvide revisar su correo spam!</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default VerifyEmail;
