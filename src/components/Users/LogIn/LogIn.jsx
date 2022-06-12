import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth, googleProvider } from "../../../firebase/firebaseconfig";
import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { UserContext } from "../../../contexts/UserContext";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "./LogIn.css"

function LogIn() {
  const auth1 = getAuth();

  const setUser = useContext(UserContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    console.log({ inputName, value });
    setValues({ ...values, [inputName]: value });
    console.log(values.email.value);
    console.log(values.password.value);
  };

  const handleGoogleLogin = async () => {
    await auth.signInWithPopup(googleProvider);
    const docRef = db.collection("Usuarios").doc(auth.currentUser.uid);

    docRef
      .get()
      .then((doc) => {
        console.log(doc.data());

        if (doc.data() == null) {
          const newGoogleLogin = {
            email: auth.currentUser.email,
            password: "",
            nombre: auth.currentUser.displayName,
            fecha_de_nacimiento: "",
            uid: auth.currentUser.uid,
          };

          docRef.set(newGoogleLogin).catch((err) => {
            console.log(err.message);
          });

          navigate.push("/Perfil");
        }

        navigate.push("/Perfil");
      })
      .catch((err) => {
        console.log(err);
      });

    navigate.push("/Perfil");
    console.log("Google Login");
  };

  const handleSubmit = async (e) => {

    signInWithEmailAndPassword(auth1,values.email,values.password).then((userCredential) => {
      const user = userCredential.user;
      console.log(user.email,user.uid)
      navigate.push("/")
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    
  };

  const handleLogOut = async (e) => {
    signOut(auth1).then(()=>{
      console.log("Sesión cerrada");
     
    }).catch((error) => {
      console.log(error)
      console.log("ERROR")
    })
};

  return (
    <>
      <div className="container-log-in"
      >
          <Card className="card-log-in" bg="gray"
          >
            <Card.Body className="cardback" >
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
                Inicio de Sesión <FontAwesomeIcon icon={faUser} />
              </Card.Title>

              <Card.Text>
                <Form className="form" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "rgb(131, 249, 255)" }}>
                      Correo electrónico
                    </Form.Label>
                    <Form.Control
                      className="email"
                      name="email"
                      id="email"
                      type="email"
                      placeholder="Ingresa tu correo"
                      value={values.email}
                      onChange={handleOnChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "rgb(131, 249, 255)" }}>
                      Contraseña
                    </Form.Label>
                    <Form.Control
                      className="clave"
                      name="password"
                      id="password"
                      type="password"
                      autocomplete="off"
                      placeholder="Ingresa tu contraseña"
                      value={values.password}
                      onChange={handleOnChange}
                    />
                  </Form.Group>
                  <div className="botones text-center">
                    <Button
                      className="submitLogin fw-bold"
                      variant="cyan"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Ingresar
                    </Button>
                    <br />
                    <Button
                      className="loginWithGoogle mt-2 fw-bold"
                      variant="cyan"
                      type="button"
                      onClick={handleGoogleLogin}
                    >
                      Ingresar con Google <FontAwesomeIcon icon={faGoogle} />
                    </Button>
                  </div>
                  <Button
                    className="loginWithGoogle mt-2 fw-bold"
                    variant="cyan"
                    type = "button"
                    onClick={handleLogOut}
                  >
                    cerras sesionn
                  </Button>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

    </>
  );
}

export default LogIn;
