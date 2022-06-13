import { useContext } from "react";
import { ContextoCarrito } from "../../contexts/ContextoCarrito";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";



export const ProductAddCarButton = ({ producto }) => {

    const { agregarProductoCarrito } = useContext(ContextoCarrito);
    const notify = () => toast.success("Se agregó correctamente al carrito");

    const handleAddCar = () => {
        agregarProductoCarrito(producto)
        notify()
    }
    return (
        <Button className="fw-bold" variant="cyan" onClick={handleAddCar}>
            Agregar al carrito <FontAwesomeIcon icon={faCartPlus} />
        </Button>
    )
}