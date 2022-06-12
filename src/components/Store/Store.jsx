import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useSearchParams, useParams } from "react-router-dom";
import {
  getAllProducts,
  getProductsByCategory,
  getProductsByKeywords,
} from "../../controllers/Productos";
import { Productos } from "../Productos/Productos";
import { orderProducts } from "../../utilities/OrderProducts"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export const Store = () => {

  const [query, setQuery] = useSearchParams();
  const search = query.get("search");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    if (search) {
      getProductsByKeywords(search.toLowerCase().split(" ")).then((response) => {
        setProducts(orderProducts(response, search))
        setLoading(false)
      })
    } else if (category) {
      getProductsByCategory(category).then((response) => {
        setProducts(response)
        setLoading(false)
      })
    } else {
      getAllProducts().then((response) => {
        setProducts(response)
        setLoading(false)
      })
    }
  }, [search, category]);

  return (
    <div className="d-flex align-items-center justify-content-center">
      {loading ? <LoadingSpinner /> : products.length !== 0 ? (
        <Productos data={products} />
      ) : (
        <div style={{ color: "white", position: "absolute", top: "50%", fontWeight: "bold", fontSize: "2em" }}>
          <span>No se encontraron resultados</span>
        </div>
      )}
    </div>
  );
};
