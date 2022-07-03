import React from "react";
import { useState } from "react";
import { auth } from "../../firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileWord, faUserShield } from "@fortawesome/free-solid-svg-icons";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useUserAuth } from "../../contexts/UserAuthContext";

function Register() {
  const navigate = useNavigate();

  // Constantes a usar para almacenar información de los usuarios
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [terms, setTerms] = useState(false);

  // Constantes a usar para validación de input
  const [errors, setErrors] = useState("");
  const [form, setForm] = useState("");

  // Constante para activar el tiempo para el reenvio de correo de validación
  const { setTimeActive } = useUserAuth();

  // Función para la validación de input (correo y contraseña)
  const findFormErrors = () => {
    const { email, name, password } = form;
    const newErrors = {};

    if (
      !email ||
      email === "" ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    )
      newErrors.email = "Dirección de correo inválido";
    if (!name || name === "" || !/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/i.test(name))
      newErrors.name = "Nombre inválido";
    if (!password || password === "" || !/^.{8,12}$/i.test(password))
      newErrors.password = "Entre 8 y 12 caracteres";

    if (password2 !== password)
      newErrors.password2 = "Las contraseñas no coinciden";

    if (!terms) newErrors.terms = "Debe aceptar los términos y condiciones";

    return newErrors;
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setemail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "password2":
        setPassword2(e.target.value);
        break;
      case "terms":
        setTerms(e.target.checked);
        break;
      default:
        break;
    }

    setField(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newErrors = findFormErrors();

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        // Se crea la autenticación en Firebase del usuario
        await createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            // Se envia correo de verificación del usuario recién registrado
            sendEmailVerification(auth.currentUser)
              .then(() => {
                // Activar tiempo para el reenvió de correo de validación
                setTimeActive(true);

                // Se envía el nombre y correo a la ruta /verificación para poder
                // almacenar los datos del usuario en Firestore
                navigate("/verificacion-de-correo", {
                  state: {
                    name: name,
                    email: email,
                  },
                });
              })
              .catch((err) => alert(err.message));
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/email-already-in-use":
                toast.error(
                  "Ya existe una cuenta con el correo electrónico proporcionado."
                );
                break;

              default:
                toast.error("Error de conexión.");
                console.log(error);
                break;
            }
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-log-in">
        <Toaster position="bottom-right" reverseOrder={false} />
        <Card className="card-log-in" bg="gray">
          <Card.Body className="cardbodyre">
            <Card.Title
              className="registrotitle"
              style={{
                textAlign: "center ",
                fontFamily: "EvilEmpire",
                color: "rgb(239, 211, 0)",
                letterSpacing: "2px",
                fontSize: "2rem",
              }}
            >
              Registro <FontAwesomeIcon icon={faUserShield} />
            </Card.Title>
            <div>
              <Form className="form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "rgb(239, 211, 0)" }}>
                    Nombre completo
                  </Form.Label>
                  <Form.Control
                    className="name"
                    type="text"
                    id="name"
                    placeholder="Ingrese su nombre"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ color: "cyan" }}
                  >
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "rgb(239, 211, 0)" }}>
                    Correo electrónico
                  </Form.Label>
                  <Form.Control
                    className="email"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Ingresa tu correo"
                    value={email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ color: "cyan" }}
                  >
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "rgb(239, 211, 0)" }}>
                    Contraseña
                  </Form.Label>
                  <Form.Control
                    className="clave"
                    name="password"
                    id="password"
                    type="password"
                    autoComplete="off"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ color: "cyan" }}
                  >
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "rgb(239, 211, 0)" }}>
                    Repetir contraseña
                  </Form.Label>
                  <Form.Control
                    className="clave2"
                    name="password2"
                    id="password2"
                    type="password"
                    autoComplete="off"
                    placeholder="Ingresa tu contraseña"
                    value={password2}
                    onChange={handleChange}
                    isInvalid={!!errors.password2}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ color: "cyan" }}
                  >
                    {errors.password2}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-3 d-flex"
                  controlId="formBasicCheckbox"
                >
                  <Form.Check
                    required
                    name="terms"
                    id="switch"
                    type="checkbox"
                    label="Aceptar términos y condiciones"
                    onChange={handleChange}
                    value={terms}
                    isInvalid={!!errors.terms}
                    feedback={errors.terms}
                    feedbackType="invalid"
                    style={{ color: "rgb(239, 211, 0)" }}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ color: "cyan" }}
                  >
                    {errors.terms}
                  </Form.Control.Feedback>
                  <Button
                    onClick={() =>
                      window.open(
                        "https://docs.google.com/document/d/1LlLSy6Egx3EM02QPCj-ON9LyxBTn0Rsj9GGLsTohr6U/edit?usp=sharing",
                        "_blank"
                      )
                    }
                    className="btn p-0 mx-3"
                    variant="gray"
                  >
                    <FontAwesomeIcon icon={faFileWord} />
                  </Button>
                </Form.Group>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    className="submitRegister fw-bold"
                    variant="yellow"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Crear
                  </Button>
                </div>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Register;
