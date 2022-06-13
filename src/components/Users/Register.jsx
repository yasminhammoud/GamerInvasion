import React from "react";
import { useState } from "react";
import { auth, db, app } from "../../firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState("");
  const [form, setForm] = useState("");
  const colRef = collection(db,"Usuarios");

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
        await createUserWithEmailAndPassword(auth, email, password)
          .then(() => {

            console.log("registo exitoso");
            toast.success("Se ha registrado exitósamente");

             addDoc(colRef, {
              Nombre: name,
              Password: password,
              Email: email,
              
            })
            navigate("/tienda");
          })
          .catch((error) => {
            let message;
            switch (error.code) {
              case "auth/email-already-in-use":
                message =
                  "Ya existe una cuenta con el correo electrónico proporcionado.";
                break;

              default:
                console.log(error);
                break;
            }
            toast.error("Ya existe una cuenta con el correo electrónico proporcionado.");
            console.log(message);
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
              Registro{" "}
              <FontAwesomeIcon icon={faUserShield} />
            </Card.Title>
            <Card.Text>
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
                    autocomplete="off"
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
                    autocomplete="off"
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
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Register;
