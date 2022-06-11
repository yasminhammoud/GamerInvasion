import { useEffect, useState } from "react";
import { getProductsPromotions } from "../../controllers/Productos";
import { Productos } from "../Productos/Productos";
import { Spinner, Row } from "react-bootstrap";

export const PromotionPage = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProductsPromotions().then((response) => {
            setProducts(response)
            setLoading(false)
        })
    }, []);

    return (
        <div className="d-flex align-items-center justify-content-center">
            {loading ? (
                <>
                    {" "}
                    <Row style={{ position: "absolute", top: "50%" }}>
                        <Spinner variant="yellow" animation="grow" />
                        <Spinner className="mx-5" variant="yellow" animation="grow" />
                        <Spinner variant="yellow" animation="grow" />
                    </Row>
                </>
            ) : products.length !== 0 ? (
                <Productos data={products} />
            ) : (
                <div style={{ color: "white", position: "absolute", top: "50%", fontWeight: "bold", fontSize: "2em" }}>
                    <span>No se encontraron resultados</span>
                </div>
            )}
        </div>
    )
}