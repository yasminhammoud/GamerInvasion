import { useNavigate } from "react-router-dom";
import { db, auth, googleProvider } from "../../firebase/firebaseconfig";
import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function LogIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [form, setForm] = useState("");

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  /* const handleGoogleLogin = async () => {
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
    }; */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/store");
    } catch (error) {
      let message;

      switch (error.code) {
        case "auth/wrong-password":
          message = "Contraseña incorrecta";
          break;
        case "user-not-found":
          message = "Usuario no encontrado";
          break;
        default:
          message = "Error desconocido";
          break;
      }
    }
  };

  return (
    <>
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
                    value={email}
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
                    value={password}
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
                    /* onClick={handleSubmit} */
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
