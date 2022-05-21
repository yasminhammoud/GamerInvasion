import { useEffect, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import { useSearchParams, useParams } from "react-router-dom";
import {
  getAllProducts,
  getProductsByCategory,
  getProductsByKeywords,
} from "../../services/products";
import { Productos } from "../Productos/Productos";

export const Store = () => {
  const [query, setQuery] = useSearchParams();
  const search = query.get("search");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const orderProducts = (response) => {
    const productsCoincidences = [];
    const inputArray = search.toLowerCase().split(" ");
    response.map((prod) =>
      productsCoincidences.push({
        coincidencias: prod.Keywords.filter((element) =>
          inputArray.includes(element)
        ).length,
        ...prod,
      })
    );
    return productsCoincidences.sort(function (a, b) {
      return parseFloat(b.coincidencias) - parseFloat(a.coincidencias);
    });
  };

  useEffect(() => {
    if (search) {
      getProductsByKeywords(search.toLowerCase().split(" ")).then(
        (response) => {
          setProducts(orderProducts(response));
          setLoading(false);
        }
      );
    } else if (category) {
      getProductsByCategory(category).then((response) => {
        setProducts(response);
        setLoading(false);
      });
    } else {
      getAllProducts().then((response) => {
        setProducts(response);
        setLoading(false);
      });
    }
  }, [search, category]);

  return (
    <div className="d-flex align-items-center justify-content-center">
      {loading ? (
        <>
          {" "}
          <Row style={{position:"absolute", top: "50%"}}>
          <Spinner variant="yellow" animation="grow" />
          <Spinner className="mx-5" variant="yellow" animation="grow" />
          <Spinner variant="yellow" animation="grow" />
          </Row>
        </>
      ) : products.length !== 0 ? (
        <Productos data={products} />
      ) : (
        <div style={{ color: "white", position:"absolute", top: "50%", fontWeight:"bold", fontSize: "2em"}}>
          <span>No se encontraron resultados</span>
        </div>
      )}
    </div>
  );
};
