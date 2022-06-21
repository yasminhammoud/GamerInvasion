import { useEffect, useState, createContext } from "react";

export const ContextoCarrito = createContext();

export const ContextoCarritoProvider = ({ children }) => {

    // Aca lo que se hace es guardar los productos que se encuentran en el carrito en el local storage 
    // Para luego retornarlo y tener asi de esa forma un carrito con todos los productos que la persona agrego

    const [productoCarrito, setproductoCarrito] = useState(() => {
        try {
            const productosLocalStorage = localStorage.getItem("productosCarrito");
            return productosLocalStorage ? JSON.parse(productosLocalStorage) : [];
        } catch (error) {
            return [];
        }
    });

    // Este useEffect lo que hace es setear los procutos que estan en el carrito dentro de productoCarrito 
    // que se declaro en el useState

    useEffect(() => {
        localStorage.setItem("productosCarrito", JSON.stringify(productoCarrito));
        // console.log(productoCarrito);
    }, [productoCarrito]);

    // Con esta funcion lo que se hace es poder agregar productos al carrito , a esta funcion se le pasa como parametro
    // el producto y luego de esto se hace un find para verificar si ese producto esta o no esta en el carrito 
    // y en el caso de que este en el carrito lo que se hace es devolver el mismo producto pero se le suma en 1 unidad
    // y si no esta en el carrito se agrega el producto en 1 cantidad

    const agregarProductoCarrito = (producto) => {
        const enCarrito = productoCarrito.find(
            (productoEnCarrito) => productoEnCarrito.id === producto.id
        );

        if (enCarrito) {
            setproductoCarrito(
                productoCarrito.map((productoEnCarrito) => {
                    if (productoEnCarrito.id === producto.id) {
                        return {
                            ...productoEnCarrito,
                            amount: productoEnCarrito.amount + 1,
                        };
                    } else return productoEnCarrito;
                })
            );
        } else {
            setproductoCarrito([...productoCarrito, { ...producto, amount: 1 }]);
        }
    };

    // Con esta funcion lo que se hace es poder eliminar productos al carrito , a esta funcion se le pasa como parametro
    // el producto y luego de esto se hace un find para verificar si ese producto esta o no esta en el carrito 
    // y en el caso de que este en el carrito y este una vez se le decrementa en 1 unidad dicho producto
    // y si no esta en el carrito pues simplemente se deja de esa manera.

    const eliminarProductoCarrito = (producto) => {
        const enCarrito = productoCarrito.find(
            (productoEnCarrito) => productoEnCarrito.id === producto.id
        );

        if (enCarrito.amount === 1) {
            setproductoCarrito(
                productoCarrito.filter(
                    (productoEnCarrito) => productoEnCarrito.id !== producto.id
                )
            );
        } else {
            setproductoCarrito(
                productoCarrito.map((productoEnCarrito) => {
                    if (productoEnCarrito.id === producto.id) {
                        return { ...enCarrito, amount: enCarrito.amount - 1 };
                    } else return productoEnCarrito;
                })
            );
        }
    };

    // Con esta funcion lo que se hace es darle la facilidad al usuario para que pueda eliminar todo el producto con un solo click
    // para que de esta manera no tenga que sacarlo 1 por 1

    const eliminarTodoProducto = (producto) => {
        setproductoCarrito(
            productoCarrito.filter(
                (productoEnCarrito) => productoEnCarrito.id !== producto.id
            )
        );
    };

    const resetearCarrito = () => {
        setproductoCarrito(
            productoCarrito = []
        )
    }

    return (
        <ContextoCarrito.Provider
            value={{
                productoCarrito,
                agregarProductoCarrito,
                eliminarProductoCarrito,
                eliminarTodoProducto,
                resetearCarrito,
            }}
        >
            {children}
        </ContextoCarrito.Provider>
    );
}
