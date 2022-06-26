import React from 'react';
import './Profile.css';
import { useState } from 'react';
import {db} from "../../firebase/firebaseconfig";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFirestore, collection } from "firebase/firestore";
import { Form, Button, Card , Container, Row, Col, TabContent, Image} from "react-bootstrap";
 
 
 
//importar useUserAuth de UserAuthContext
// traer current user: const { currentUser } = useUserAuth();
//mostrar la informacion del usuario en el perfil
//
 
 
 
function Profile() {
 
 
    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [form, setForm] = useState("");
    const [errors, setErrors] = useState("");
 
    const findFormErrors = () => {
        const { email, name, password } = form;
        const newErrors = {};
       
        if (!name || name === "" || !/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/i.test(name))
          newErrors.name = "Nombre inválido";
        if (!password || password === "" || !/^.{8,12}$/i.test(password))
          newErrors.password = "Entre 8 y 12 caracteres";
        if (!phone || phone.length != 11)
          newErrors.phone = "Teléfono inválido";
        return newErrors;
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
      case "phone":
        setPhone(e.target.value);
        break;
      case "address":
        setAddress(e.target.value);
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
      //await signInWithEmailAndPassword(auth, email, password);
      //navigate("/tienda");
    }
      toast.success("Inicio de sesión exitoso");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          toast.error("Datos inválidos");
          break;
        case "user-not-found":
          toast.error("Usuario no encontrado");
          break;
        default:
          toast.error("Datos inválidos");
          break;
      }
    }
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
 
 
  const currentUser = {
    nombre: "Miguel Colina",
    password: "9809841",
    correo: "miguelcolina@gmail.com",
    telefono: "04143964240",
    direccion: "Urbanización Los Pomelos"
  }
 
 
  return (
<div className='container-log-in'>
    <Container className="container-md emp-profile">
            <Form method="post">
                <Row className="row">
                    <Col className="col-md-4">
                        <div className="profile-img" >
                            <Image src="https://s3.amazonaws.com/prod-media.gameinformer.com/styles/body_default/s3/legacy-images/imagefeed/RIP%3A%20Honoring%20The%20Life%20And%20Death%20Of%20Xbox%20One%E2%80%99s%20Default%20Gamerpics/4SamNxh.jpg" alt="Profile picture"/>
                            <Button className="file btn btn-lg btn-primary" id="changeImgButton">
                                Cambiar foto
                                <input type="file" name="file"/>
                            </Button>
                        </div>
                    </Col>
                    <Col className="col-md-6" >
                        <div className="profile-head" id = 'profileUserName'>
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
                            {currentUser.nombre}
                            </Card.Title>
                            <Card.Title
                                className="registrotitle"
                                style={{
                                    textAlign: "center ",
                                    fontFamily: "EvilEmpire",
                                    color: "rgb(255, 255, 255)",
                                    letterSpacing: "2px",
                                    fontSize: "1.3rem",
                                }}
                            >
                            GAMER
                            </Card.Title>
                            <Card.Title
                                className="registrotitle"
                                style={{
                                    textAlign: "center ",
                                    fontFamily: "EvilEmpire",
                                    color: "rgb(255, 255, 255)",
                                    letterSpacing: "2px",
                                    fontSize: "1.3rem",
                                }}
                            >
                            COMPRAS: 4
                            </Card.Title>
 
                            <br></br>
 
                        </div>
 
                        <Row id = "linebreakDiv"></Row>
 
                    </Col>
                    <Col className="col-md-2">
                        <Button
                            className="submitRegister fw-bold"
                            variant="yellow"
                            type="submit"
                            onClick={handleSubmit}
                        >
                    Guardar
                  </Button>
                    </Col>
                </Row>
                <Row className="row">
                    <Col className="col-md-4">
                        <div className="profile-work">
                            <p>ÚLTIMAS COMPRAS</p>
                            <a href="">PC GAMER</a><br/>
                            <a href="">XBOX ONE</a><br/>
                            <a href="">MONITOR 4K</a><br/>
                            <a href="">XBOX SERIES X</a><br/>
                        </div>
                    </Col>
                    <Col className="col-md-8">
                        <TabContent className="tab-content profile-tab" id="tabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <Row className="row">
                                            <Col className="col-md-6" id="profileInfoContainer">
                                                <label>NOMBRE:</label>
                                            </Col>
                                            <Col className="col-md-6" id="profileInfoContainer">
                                            <Form.Control
                                                className="name"
                                                type="text"
                                                id="name"
                                                placeholder={currentUser.nombre}
                                                name="name"
                                                value={name}
                                                onChange={handleChange}
                                                isInvalid={!!errors.name}
                                            />
                                            </Col>
                                        </Row>
                                       
                                        <Row className="row">
                                            <Col className="col-md-6" id="profileInfoContainer">
                                                <label>EMAIL:</label>
                                            </Col>
                                            <Col className="col-md-6" id="profileInfoContainer">
                                                <Form.Control
                                                    className="email"
                                                    name="email"
                                                    id="email"
                                                    type="email"
                                                    placeholder={currentUser.correo}
                                                    value={email}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.email}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="row">
                                            <Col className="col-md-6" id="profileInfoContainer">
                                            <label>TELÉFONO:</label>
                                            </Col>
                                            <Col className="col-md-6" id="profileInfoContainer">
                                            <Form.Control
                                                    className="name"
                                                    name="phone"
                                                    id="phone"
                                                    type="phone"
                                                    placeholder={currentUser.telefono}
                                                    value={phone}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.email}
                                            />
                                            </Col>
                                        </Row>
                                        <Row className="row">
                                            <Col className="col-md-6" id="profileInfoContainer">
                                                <label>DIRECCIÓN:</label>
                                            </Col>
                                            <Col className="col-md-6" id="profileInfoContainer">
                                            <Form.Control
                                                    className="name"
                                                    name="address"
                                                    id="address"
                                                    type="address"
                                                    placeholder={currentUser.direccion}
                                                    value={address}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.email}
                                                />
                                            </Col>
                                        </Row>
                            </div>
                           
                        </TabContent>
                    </Col>
                </Row>
            </Form>          
        </Container>
    </div>
  )
}
 
export default Profile
