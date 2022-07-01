import React, { useEffect, useState } from "react";
import { getOrdersByID } from "../../controllers/Productos";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { useUserAuth } from "../../contexts/UserAuthContext";
import { Row, Container } from "react-bootstrap";
import { OrderCard } from "./OrderCard";

export const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useUserAuth();

  useEffect(() => {
    getOrdersByID(currentUser.uid).then((response) => {
      setOrders(response);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="banner">
        <div className="centered" style={{ letterSpacing: "3px" }}>
          Compras
        </div>
      </div>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center">
          <LoadingSpinner />
        </div>
      ) : orders.length === 1 ? (
        <Container
          className="d-flex justify-content-center border-0"
          id="news-card-cointainer"
        >
          {orders.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))}
        </Container>
      ) : orders.length !== 0 ? (
        <Container
          className="d-flex justify-content-center border-0"
          id="news-card-cointainer"
        >
          <Row>
            {orders.map((order, index) => (
              <OrderCard key={index} order={order} />
            ))}
          </Row>
        </Container>
      ) : (
        <div className="d-flex align-items-center justify-content-center">
          <div
            style={{
              color: "white",
              position: "absolute",
              top: "50%",
              fontWeight: "bold",
              fontSize: "2em",
            }}
          >
            <span>No se encontraron resultados</span>
          </div>
        </div>
      )}
    </div>
  );
};
