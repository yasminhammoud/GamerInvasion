export const Billing = ({ total, subtotal, discount, currentUser }) => {
    
    function roundToTwo(num) {
        return +(Math.round(num + "e+2") + "e-2");
    }

    return (
        <div className="row d-flex justify-content-center">
            <table className="table table-borderless">
                <tbody className="totals" style={{ color: "white" }}>
                    <tr>
                        <td>
                            <div className="text-start fw-bold">
                                <span> Subtotal </span>
                            </div>
                        </td>
                        <td>
                            <div className="text-end">
                                {" "}
                                <span>{roundToTwo(subtotal * 0.84)}$</span>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div className="text-start fw-bold">
                                <span> Iva </span>
                            </div>
                        </td>
                        <td>
                            <div className="text-end">
                                {" "}
                                <span>{roundToTwo(subtotal * 0.16)}$</span>
                            </div>
                        </td>
                    </tr>
                    {discount === 0 ? (
                        ""
                    ) : (
                        <tr style={{ color: "rgb(131, 249, 255)" }}>
                            <td>
                                <div className="text-start fw-bold">
                                    <span> Descuento </span>
                                </div>
                            </td>
                            <td>
                                <div className="text-end">
                                    {" "}
                                    <span>- {discount.toFixed(2)}$</span>
                                </div>
                            </td>
                        </tr>
                    )}
                    {!currentUser?.discount ? (
                        ""
                    ) : (
                        <tr style={{ color: "rgb(131, 249, 255)" }}>
                            <td>
                                <div className="text-start fw-bold">
                                    <span> Descuento Erin </span>
                                </div>
                            </td>
                            <td>
                                <div className="text-end">
                                    {" "}
                                    <span>- {parseInt("5").toFixed(2)}$</span>
                                </div>
                            </td>
                        </tr>
                    )}

                    <tr className="border-top border-bottom">
                        <td>
                            <div className="text-start fw-bold">
                                <span> Total </span>
                            </div>
                        </td>
                        <td>
                            <div className="text-end">
                                {" "}
                                <span>{(total).toFixed(2)}$ </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}