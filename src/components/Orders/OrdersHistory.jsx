import React, {useEffect, useState } from "react";
import { getAllOrders} from "../../controllers/Productos";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { useUserAuth } from "../../contexts/UserAuthContext";

export const OrdersHistory = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const {currentUser} = useUserAuth()

    useEffect(() => {
          getAllOrders().then((response) => {
            setOrders(response)
            setLoading(false)
          })
        console.log(orders)

      },[]);

    return (
        

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
            <div className="py-2"> <span className="d-block text-muted">Order Date</span> <span>2 de mayo de 2022</span> </div>
            </td>
            <td>
            <div className="py-2"> <span className="d-block text-muted">Order No</span> <span>MT12332345</span> </div>
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
            <div className="product-qty"> <span className="d-block">Quantity:1</span></div>
            </td>
            <td width="20%">
            <div className="text-right"> <span className="font-weight-bold">$67.50</span> </div>
            </td>
            </tr>
            <tr>
            <td width="20%"> <img src="https://i.imgur.com/SmBOua9.jpg" width="70"/> </td>
            <td width="60%"> <span className="font-weight-bold">Men's Collar T-shirt</span>
            <div className="product-qty"> <span className="d-block">Quantity:1</span> </div>
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
            </td>
            </tr>
            </tbody>
            </table>
            </div>
            </div>
            <p className="font-weight-bold mb-0">Thanks for shopping with us!</p> <span>GamerInvasion Team</span>
            </div>
            </div>
            </div>
            </div>
            </div> 
                   
    )
};
        