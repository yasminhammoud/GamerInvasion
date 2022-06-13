import { useEffect, useState } from "react";
import { getProductsPromotions } from "../../controllers/Productos";
import { Productos } from "../Productos/Productos";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

/*Component that fetches all products with discount from a Firebase Colletion and displays it in product page. */
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
            {loading ? < LoadingSpinner /> : products.length !== 0 ? (
                <Productos data={products} />
            ) : (
                <div style={{ color: "white", position: "absolute", top: "50%", fontWeight: "bold", fontSize: "2em" }}>
                    <span>No se encontraron resultados</span>
                </div>
            )}
        </div>
    )
}