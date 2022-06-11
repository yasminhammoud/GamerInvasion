import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth, googleProvider } from "../../../firebase/firebaseconfig";
import { useState } from "react";
import { Form, Button, Container, Col, Row, Card } from "react-bootstrap";
import { UserContext } from "../../../contexts/UserContext";
import registro2 from "../../../images/registro2.jpg";
import aboutUs from "../../../images/log-in-pic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import "./LogIn.css"

function LogIn() {
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
  };

  const handleGoogleLogin = async () => {
    await auth.signInWithPopup(googleProvider);
    const docRef = db.collection("usuarios").doc(auth.currentUser.uid);

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
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(values.email, values.password);
      console.log("Inicio de sesión exitoso.");
      navigate.push("/");
    } catch {
      console.log("Datos inválidos.");
    }
  };

  /* const findFormErrors = () => {
        const { email, nombre } = form;
        const newErrors = {};
        console.debug();

        if (!email || email === "" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) newErrors.email = "Dirección de correo inválido";
        if (!nombre || nombre === '' || !/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/i.test(nombre)) newErrors.nombre = 'Nombre inválido'

        return newErrors;
    }; */

  return (
    <>

      <div className="container-log-in"
        
      >
          <Card className="card-log-in"
          >
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
                Inicio de Sesión
              </Card.Title>

              <Card.Text>
                <Form className="form" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
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

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ color: "rgb(131, 249, 255)" }}>
                      Contraseña
                    </Form.Label>
                    <Form.Control
                      className="clave"
                      name="password"
                      id="password"
                      type="password"
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
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

    </>
  );
}

export default LogIn;
