import React from "react";
import { useState } from "react";
import { auth, db } from "../../../firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Col, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast"
import registro2 from "../../../images/registro2.jpg";


function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
        nombre: "",
        fecha_de_nacimiento: "",
        telefono: "",
        profile_pic: "",
    });
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});


    const handleOnChange = (e) => {
        const { value, name: inputName } = e.target;
        setValues({ ...values, [inputName]: value });
        setField(inputName, e.target.value);
    };

    const {
        profile_pic,
        email,
        password,
        nombre,
        fecha_de_nacimiento,
        telefono,
    } = values;

    const findFormErrors = () => {
        const { email, nombre, password, fecha_de_nacimiento, telefono } = form;
        const newErrors = {};
        console.debug();

        if (!email || email === "" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) newErrors.email = "Dirección de correo inválido";
        if (!nombre || nombre === '' || !/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/i.test(nombre)) newErrors.nombre = 'Nombre inválido'
        if (!password || password === "" || !/^.{8,12}$/i.test(password)) newErrors.password = 'Entre 8 y 12 caracteres'
        if (!telefono || telefono === '' || !/^.{10}$/i.test(telefono)) newErrors.telefono = 'Telefono inválido'
        if (!fecha_de_nacimiento || fecha_de_nacimiento === '') newErrors.nacimiento = 'Fecha inválida'

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newErrors = findFormErrors();

            if (Object.keys(newErrors).length > 0) {

                setErrors(newErrors);
            } else {
                const response = await auth.createUserWithEmailAndPassword(
                    values.email,
                    values.password
                );

            }
        } catch (error) {
            toast.error("Datos invalidos");
        }
    };

    return (
        <>

            <div style={{ position: 'relative', textAlign: 'center' }}>
                <img className="d-block w-100" src={registro2} alt="about-us" />
            </div>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />

            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "40%" }}>

                <Card className="card" bg="dark-purple">
                    <Card.Body className="cardbodyre" >
                        <Card.Title className="registrotitle" style={{ textAlign: "center ", fontFamily: "EvilEmpire", color: "rgb(239, 211, 0)" }}>Registro</Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                        <Card.Text>
                            <Form className="form" onSubmit={handleSubmit}>


                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label style={{ color: "rgb(239, 211, 0)" }}>Nombre</Form.Label>
                                    <Form.Control
                                        className="name"
                                        type="text"
                                        id="nombre"
                                        placeholder="Ingrese su nombre"
                                        name="nombre"
                                        value={values.nombre}
                                        onChange={handleOnChange}
                                        isInvalid={!!errors.nombre}
                                    />
                                    <Form.Control.Feedback type="invalid" style={{ color: "cyan" }}>
                                        {errors.nombre}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ color: "rgb(239, 211, 0)" }}>Correo</Form.Label>
                                    <Form.Control
                                        className="email"
                                        name="email"
                                        id="email"
                                        type="email"
                                        placeholder="Ingresa tu correo"
                                        value={values.email}
                                        onChange={handleOnChange}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid" style={{ color: "cyan" }}>
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>




                                <Form.Group className="mb-3" controlId="formBasicDate">
                                    <Form.Label style={{ color: "rgb(239, 211, 0)" }}>Fecha de nacimiento</Form.Label>
                                    <Form.Control
                                        className="date"
                                        type="date"
                                        id="fecha_de_nacimiento"
                                        name="fecha_de_nacimiento"
                                        value={values.fecha_de_nacimiento}
                                        onChange={handleOnChange}
                                        isInvalid={!!errors.nacimiento}
                                    />
                                    <Form.Control.Feedback type="invalid" style={{ color: "cyan" }}>
                                        {errors.nacimiento}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label style={{ color: "rgb(239, 211, 0)" }}>Contraseña</Form.Label>
                                    <Form.Control
                                        className="clave"
                                        name="password"
                                        id="password"
                                        type="password"
                                        placeholder="Ingresa tu contraseña"
                                        value={values.password}
                                        onChange={handleOnChange}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid" style={{ color: "cyan" }}>
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Button

                                        className="submitRegister"
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
