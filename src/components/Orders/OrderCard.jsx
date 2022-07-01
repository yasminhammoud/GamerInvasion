import { OrderProductCard } from "./OrderProductCard"

export const OrderCard = ({ order }) => {

    return (
        <div className="container mt-5 mb-5" style={{ color: "white" }}>
            <div className="row d-flex justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="invoice p-5">
                            <div className="payment border-top mt-3 mb-3 border-bottom table-responsive">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="py-2"> <span className="d-block text-muted">Order Date</span> <span>15-11-2001</span> </div>
                                            </td>
                                            <td>
                                                <div className="py-2"> <span className="d-block text-muted">Order ID</span> <span>{order.id}</span> </div>
                                            </td>
                                            <td>
                                                <div className="py-2"> <span className="d-block text-muted">Payment</span> <span><img src="https://img.icons8.com/color/48/000000/mastercard.png" width="20" /></span> </div>
                                            </td>
                                            <td>
                                                <div className="py-2"> <span className="d-block text-muted">Shiping Address</span> <span>414 Advert Avenue, NY,USA</span> </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="product border-bottom table-responsive">
                                <table className="table table-borderless">
                                    {order.productos.map((prod, index) => (
                                        <OrderProductCard key={index} product={prod} />
                                    ))}

                                </table>
                            </div>
                            <div className="row d-flex justify-content-end">
                                <div className="col-md-5">
                                    <table className="table table-borderless">
                                        <tbody className="totals">
                                            <tr className="border-top border-bottom">
                                                <td>
                                                    <div className="text-left"> <span className="font-weight-bold">Total</span> </div>
                                                </td>
                                                <td>
                                                    <div className="text-right"> <span className="font-weight-bold">${order.total}</span> </div>
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
        </div >
    )
}