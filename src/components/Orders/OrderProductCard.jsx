export const OrderProductCard = ({ prod }) => {
    return (
        <tr>
            <td width="20%"> <img src={prod[0].urlImagen} width="90" /> </td>
            <td width="60%"> <span className="font-weight-bold">{prod[0].nombre}</span>
                <div className="product-qty"> <span className="d-block">Cantidad: {prod[0].cantidad}</span></div>
            </td>
            <td width="20%">
                <div className="text-right"> <span className="font-weight-bold">${prod[0].subTotal}</span> </div>
            </td>
        </tr>

    )
}