import { ProductCard } from "./ProductCard"
import { Row, Col, Container } from "react-bootstrap";
import { Filters } from "../Filter/Filters"

/* Component that renders page of products that contains Filters and ProductCards */
export const Productos = ({ data}) => {

    return (
        <Container className=" mt-7">
            <Row className="justify-content-center">

                <Col xs={8} md={8} lg={3} className="mb-4">
                    <div style={{ color: "white", border: "1px", "border-color": "white", "background": "linear-gradient(180deg, rgb(43, 0, 56) 20%, rgb(24, 0, 71) 100%)", "border-radius": "0.5rem", "padding": "2rem", "margin-top": "0.5rem"}}>
                        <span>{data.length} resultados</span>
                        <br></br>
                        <br></br>
                        <Filters style={{ "margin": "15px" }} productos={data} />
                    </div>
                </Col>
                <Col xs={12} md={12} lg={9}>
                    <Row>
                        {data.map((producto, index) => (
                            <Col key={index}  className="d-flex justify-content-center">
                                <ProductCard producto={producto} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>

    )
}
