import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseconfig";
import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

// Función que se ejecuta al hacer click en el botón de iniciar sesión
function LogIn() {
  const navigate = useNavigate();

  // Constantes a usar para almacenar información de los usuarios
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Constantes a usar para validación de input
  const [errors, setErrors] = useState("");
  const [form, setForm] = useState("");

  // Función para la validación de input (correo y contraseña)
  const findFormErrors = () => {
    const { email, password } = form;
    const newErrors = {};

    if (
      !email ||
      email === "" ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    )
      newErrors.email = "Dirección de correo inválido";

    if (!password || password === "" || !/^.{8,12}$/i.test(password))
      newErrors.password = "Entre 8 y 12 caracteres";

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

  const handleOnChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
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
        // Si no hay errores, se inicia sesión con correo y contraseña
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Inicio de sesión exitoso");
        navigate("/tienda");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          toast.error("Dato s inválidos");
          break;
        case "user-not-found":
          toast.error("Usuario no encontrado");
          break;
        default:
          toast.error("Error de conexión");
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
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ color: "rgb(239, 211, 0)" }}
                  >
                    {errors.email}
                  </Form.Control.Feedback>
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
                    autoComplete="off"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={handleOnChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ color: "rgb(239, 211, 0)" }}
                  >
                    {errors.password}
                  </Form.Control.Feedback>
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
