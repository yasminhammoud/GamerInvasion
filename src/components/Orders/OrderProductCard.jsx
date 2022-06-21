export const OrderProductCard = ({ product }) => {
    console.log(product)
    console.log("ASD")
    return (
        <tr>
            <td width="20%"> <img src={product.urlImagen} width="90" /> </td>
            <td width="60%"> <span className="font-weight-bold">{product.nombre}</span>
                <div className="product-qty"> <span className="d-block">Cantidad: {product.cantidad}</span></div>
            </td>
            <td width="20%">
                <div className="text-right"> <span className="font-weight-bold">${product.subTotal}</span> </div>
            </td>
        </tr>
    )
}