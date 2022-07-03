export const OrderProductCard = ({ product }) => {
    return (
        <tr>
            <td> <img src={product.urlImagen} className="rounded-6" alt="producto" width="90" /> </td>

            <td width="60%"> <span className="font-weight-bold" style={{textTransform: "capitalize"}}>{product.nombre}</span>
                <div className="product-qty"> <span className="d-block"> <strong>Cantidad: </strong>{product.cantidad}</span></div>
            </td>
            <td width="20%">
                <div className="text-right"> <span className="font-weight-bold">${product.subTotal}</span> </div>
            </td>
        </tr>

    )
}