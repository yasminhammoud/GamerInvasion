import { OrderProductCard } from "./OrderProductCard";

export const OrderCard = ({ order }) => {
  return (
    <div className="container mt-5 mb-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <div className="card bg-gray">
            <div className="invoice p-2">
              <div className="payment border-top mt-3 mb-3 border-bottom table-responsive border-cyan">
                <table className="table table-borderless text-light">
                  <tbody>
                    <tr>
                      <td>
                        <div className="py-2">
                          {" "}
                          <span className="d-block text-muted">
                            Fecha de Compra
                          </span>{" "}
                          <span>{order.fecha}</span>{" "}
                        </div>
                      </td>
                      <td>
                        <div className="py-2">
                          {" "}
                          <span className="d-block text-muted">
                            Referencia
                          </span>{" "}
                          <span>{order.id}</span>{" "}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="product border-bottom border-cyan table-responsive">
                <table className="table table-borderless text-white">
                  {order.productos.map((prod, index) => (
                    <OrderProductCard key={index} product={prod} />
                  ))}
                </table>
              </div>
              <div className="row d-flex justify-content-end">
                <div className="col-md-5">
                  <table className="table table-borderless">
                    <tbody className="totals">
                      <tr className="border-bottom border-yellow text-white">
                        <td>
                          <div className="text-left">
                            {" "}
                            <span> <strong>Total</strong></span>{" "}
                          </div>
                        </td>
                        <td>
                          <div className="text-right">
                            {" "}
                            <span className="font-weight-bold">
                             ${order.total}
                            </span>{" "}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
