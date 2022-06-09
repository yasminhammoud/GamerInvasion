import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth, googleProvider } from "../../../firebase/firebaseconfig";
import { useState } from "react";
import { Form, Button, Container, Col, Row, Card } from "react-bootstrap";
import { UserContext } from "../../../Context/UserContext";
import registro2 from "../../../images/registro2.jpg";


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
            console.log('Inicio de sesión exitoso.')
            navigate.push("/");
        } catch {
            console.log('Datos inválidos.')
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

            <div style={{ position: 'relative', textAlign: 'center' }}>
                <img className="d-block w-100" src={registro2} alt="about-us" />
            </div>

            <div className="login-container" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "40%" }}>

                <Card className="card">
                    <Card.Body className="cardback">
                        <Card.Title className="cardtitle">Inicio de Sesión</Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                        <Card.Text>
                            <Form className="form" onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Correo</Form.Label>
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
                                    <Form.Label>Contraseña</Form.Label>
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
                                <div className="botones">
                                    <Button
                                        className="submitLogin"
                                        variant="cyan"
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        Ingresar
                                    </Button>
                                    <br />
                                    <br />
                                    <Button
                                        className="loginWithGoogle"
                                        variant="cyan"
                                        type="button"
                                        onClick={handleGoogleLogin}
                                    >
                                        Ingresar con Google
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
