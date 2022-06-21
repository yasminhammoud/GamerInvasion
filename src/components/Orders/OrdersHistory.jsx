import React, {useEffect, useState } from "react";
import { getAllOrders} from "../../controllers/Productos";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { useUserAuth } from "../../contexts/UserAuthContext";

export const OrdersHistory = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const {currentUser} = useUserAuth()

    useEffect (() => {
        getAllOrders().then((response) => {
            setOrders(response)
            setLoading(false)
          })

        console.log(orders)
        console.log(orders.length)

      }, []);

    return (
        <div className="d-flex align-items-center justify-content-center">
      {loading ? <LoadingSpinner /> : orders.length !== 0 ? (
        orders.map((order) => {
                let fecha = order.fecha;
                let id = order.id;
                return(
                    <div className="container mt-5 mb-5">
            <div className="row d-flex justify-content-center">
            <div className="col-md-8">
            <div className="card">
            <div className="invoice p-5">
            <div className="payment border-top mt-3 mb-3 border-bottom table-responsive">
            <table className="table table-borderless">
            <tbody>
            <tr>
            <td>
            <div className="py-2"> <span className="d-block text-muted">Order Date</span> <span>{fecha}</span> </div>
            </td>
            <td>
            <div className="py-2"> <span className="d-block text-muted">Order No</span> <span>{id}</span> </div>
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
            <tbody>
            <tr>
            <td width="20%"> <img src="https://i.imgur.com/u11K1qd.jpg" width="90"/> </td>
            <td width="60%"> <span className="font-weight-bold">Men's Sports cap</span>
            <div className="product-qty"> <span className="d-block">Quantity:1</span> <span>Color:Dark</span> </div>
            </td>
            <td width="20%">
            <div className="text-right"> <span className="font-weight-bold">$67.50</span> </div>
            </td>
            </tr>
            <tr>
            <td width="20%"> <img src="https://i.imgur.com/SmBOua9.jpg" width="70"/> </td>
            <td width="60%"> <span className="font-weight-bold">Men's Collar T-shirt</span>
            <div className="product-qty"> <span className="d-block">Quantity:1</span> <span>Color:Orange</span> </div>
            </td>
            <td width="20%">
            <div className="text-right"> <span className="font-weight-bold">$77.50</span> </div>
            </td>
            </tr>
            </tbody>
            </table>
            </div>
            <div className="row d-flex justify-content-end">
            <div className="col-md-5">
            <table className="table table-borderless">
            <tbody className="totals">
            <tr>
            <td>
            <div className="text-left"> <span className="text-muted">Subtotal</span> </div>
            </td>
            <td>
            <div className="text-right"> <span>$168.50</span> </div>
            </td>
            </tr>
            <tr>
            <td>
            <div className="text-left"> <span className="text-muted">Shipping Fee</span> </div>
            </td>
            <td>
            <div className="text-right"> <span>$22</span> </div>
            </td>
            </tr>
            <tr>
            <td>
            <div className="text-left"> <span className="text-muted">Tax Fee</span> </div>
            </td>
            <td>
            <div className="text-right"> <span>$7.65</span> </div>
            </td>
            </tr>
            <tr>
            <td>
            <div className="text-left"> <span className="text-muted">Discount</span> </div>
            </td>
            <td>
            <div className="text-right"> <span className="text-success">$168.50</span> </div>
            </td>
            </tr>
            <tr className="border-top border-bottom">
            <td>
            <div className="text-left"> <span className="font-weight-bold">Subtotal</span> </div>
            </td>
            <td>
            <div className="text-right"> <span className="font-weight-bold">$238.50</span> </div>
            </td>
            </tr>
            </tbody>
            </table>
            </div>
            </div>
            <p>We will be sending shipping confirmation email when the item shipped successfully!</p>
            <p className="font-weight-bold mb-0">Thanks for shopping with us!</p> <span>Nike Team</span>
            </div>
            <div className="d-flex justify-content-between footer p-3"> <span>Need Help? visit our <a href="#"> help center</a></span> <span>12 June, 2020</span> </div>
            </div>
            </div>
            </div>
            </div>
            )})
      ) : (
        <div style={{ color: "white", position: "absolute", top: "50%", fontWeight: "bold", fontSize: "2em" }}>
          <span>No se encontraron resultados</span>
        </div>
      )}
    </div> 
                   
    )
};
        