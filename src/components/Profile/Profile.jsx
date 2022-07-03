import React from "react";
import "./Profile.css";
import { useState } from "react";
import { db } from "../../firebase/firebaseconfig";
import toast, { Toaster } from "react-hot-toast";
import { updateUser } from "../../controllers/Users"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFirestore, collection } from "firebase/firestore";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  TabContent,
  Image,
} from "react-bootstrap";
import { useUserAuth } from "../../contexts/UserAuthContext";
import { useNavigate, Link } from "react-router-dom";

//importar useUserAuth de UserAuthContext
// traer current user: const { currentUser } = useUserAuth();
//mostrar la informacion del usuario en el perfil
//

function Profile() {

  let navigate = useNavigate(); 

  const changeUrl = () =>{
    navigate("/historial-compras")
  }

  const { currentUser, setCurrentUser } = useUserAuth()

  const [name, setName] = useState(currentUser.name);
  const [email, setemail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [address, setAddress] = useState(currentUser.address);
  const [form, setForm] = useState("");
  const [errors, setErrors] = useState("");

  const findFormErrors = () => {
    const { name } = form;
    const newErrors = {};

    if (!name || name === "" || !/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/i.test(name))
      newErrors.name = "Nombre inválido";
    if (!phone || phone === "" || phone.length != 11) newErrors.phone = "Teléfono inválido";
    if (!address || address === "")
      newErrors.address = "Dirección inválida"
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

    const updates = {
      name: name,
      phone: phone,
      address: address
    }

    try {
      const newErrors = findFormErrors();

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        updateUser(currentUser.uid, updates)
        setCurrentUser({ ...currentUser, updates })
        toast.success('Cambios guardados exitosamente.')
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado.");
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

  return (
    <div className="container-user-profile">
      <Container className="container-md emp-profile" id="mainContainerProfile">
        <Form method="post">
          <Row className="row">
            <Col className="col-md-4" sm = "auto">
              <div className="profile-img">
                <Image
                  src="https://s3.amazonaws.com/prod-media.gameinformer.com/styles/body_default/s3/legacy-images/imagefeed/RIP%3A%20Honoring%20The%20Life%20And%20Death%20Of%20Xbox%20One%E2%80%99s%20Default%20Gamerpics/4SamNxh.jpg"
                  alt="Profile picture"
                />
              </div>
            </Col>
            <Col className="col-md-6">
              <div className="profile-head" id="profileUserName">
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
                  {currentUser.name}
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

                <br></br>

              </div>

              <Row id="linebreakDiv"></Row>




            </Col>
            
          </Row>
          <Row className="row">
            
            <Col className="col-md-6" align="center" id="container321">
              <TabContent className="tab-content profile-tab" id="tabContent">
                <div id="container123">
                  <Row className="row">
                    <Col className="col-md-6" id="profileInfoContainer">
                      <label>NOMBRE:</label>
                    </Col>
                    <Col className="col-md-6" id="profileInfoContainer">
                      <Form.Group>
                        <Form.Control
                          className="name"
                          type="text"
                          id="name"
                          placeholder={currentUser.name}
                          name="name"
                          value={name}
                          onChange={handleChange}
                          isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          style={{ color: "rgb(239, 211, 0)" }}
                        >
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
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
                        placeholder={currentUser.email}
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
                      <Form.Group>
                        <Form.Control
                          className="name"
                          name="phone"
                          id="phone"
                          type="phone"
                          placeholder={currentUser.phone}
                          value={phone}
                          onChange={handleChange}
                          isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          style={{ color: "rgb(239, 211, 0)" }}
                        >
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
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
                        placeholder={currentUser.address}
                        value={address}
                        onChange={handleChange}
                        isInvalid={!!errors.address}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ color: "rgb(239, 211, 0)" }}
                      >
                        {errors.address}
                      </Form.Control.Feedback>

                    </Col>
                  </Row>
                  <Col className="col-md-6">
                    <div id="buttonDiv">
                      <Button
                          className="submitRegister fw-bold"
                          variant="yellow"
                          type="submit"
                          onClick={handleSubmit}
                      >
                        Guardar
                      </Button>

                    <Button
                      className="submitRegister fw-bold"
                      variant="yellow"
                      
                      onClick={changeUrl}
                    >
                      Últimas compras
                    </Button>
                  </div>  
                </Col> 

                </div>

              </TabContent>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default Profile;
