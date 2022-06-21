import { ProductCard } from "./ProductCard";
import { Col } from "react-bootstrap";

export const ProductsList = ({ products }) => {

    return (
        <>
            {products.map((producto, index) => (
                <Col key={index} className="d-flex justify-content-center">
                    <ProductCard producto={producto} />
                </Col>
            ))}
        </>
    )
}