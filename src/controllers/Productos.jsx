import {
    collection,
    addDoc,
    doc,
    deleteDoc,
    getDoc,
    updateDoc,
    getDocs,
    where,
    query
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebase/firebaseconfig";
const coleccion = "Productos";
const rutaFoto = "productos-imagenes";
const colletionProducts = "Productos"
const colletionOrders = "Facturas"

/**
 * It takes a bunch of form data, and adds it to a Firestore collection. It creates a product without image.
 */
export const productoCrearSF = async (
    formPc,
    formLaptop,
    formVideojuego,
    formPeriferico,
    formConsola,
    formProducto,
    categoriaSelect,
    etiquetaFinal,
    fotosSubir
) => {
    try {
        await addDoc(collection(db, coleccion), {
            Nombre: formProducto.nombre,
            Marca: formProducto.marca,
            UrlProducto: formProducto.urlProducto,
            Descripcion: formProducto.descripcion,
            EspecificacionesPc: formPc,
            EspecificacionesLaptop: formLaptop,
            EspecificacionesVideojuego: formVideojuego,
            EspecificacionesPeriferico: formPeriferico,
            EspecificacionesConsola: formConsola,
            Precio: formProducto.precio,
            Cantidad: formProducto.cantidad,
            Categoria: categoriaSelect,
            Etiqueta: etiquetaFinal,
            ImagenesUrl: fotosSubir,
        });
    } catch (e) {
        console.error("Error al agregar producto ", e);
    }
};

/**
 * It takes a bunch of form data, a category, a label, and an array of files, and uploads the files to
 * firebase storage, then returns the download URLs of the files, and then calls another function that
 * takes the form data, category, label, and download URLs and uploads them to firebase firestore.
 */
export const productoCrearCF = (
    formPc,
    formLaptop,
    formVideojuego,
    formPeriferico,
    formConsola,
    formProducto,
    categoriaSelect,
    etiquetaFinal,
    fotosVista
) => {
    const promises = fotosVista.map((file) => {
        const fechaAhora = Date.now();
        const rutaCompleta = file.name + fechaAhora + file.lastModified + file.size;
        const storage = getStorage();
        const imageRef = ref(storage, `${rutaFoto}/${rutaCompleta}`);
        return uploadBytes(imageRef, file)
            .then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            })
            .catch((error) => {
                console.error("Error al subir imagenes", error);
            });
    });
    Promise.all(promises)
        .then((linkImagenes) => {
            productoCrearSF(
                formPc,
                formLaptop,
                formVideojuego,
                formPeriferico,
                formConsola,
                formProducto,
                categoriaSelect,
                etiquetaFinal,
                linkImagenes
            );
        })
        .catch(() => {
            return "Hubo un error";
        });
};

/* ELIMINAR UNA PRODUCTO */
export const productoEliminar = async (idProducto) => {
    await deleteDoc(doc(db, coleccion, idProducto));
};

export const productoUno = async (idProducto) => {
    const productoRef = doc(db, coleccion, idProducto);
    const docProducto = await getDoc(productoRef);
    if (docProducto.exists()) {
        return docProducto.data();
    } else {
        console.log("No existe el documento");
    }
};

/**
 * It takes a bunch of form data (without image), and updates a document in a firestore collection.
 */
export const productoEditarSF = async (
    formPc,
    formLaptop,
    formVideojuego,
    formPeriferico,
    formConsola,
    formProducto,
    categoriaSelect,
    etiquetaFinal,
    fotosAntiguas
) => {
    const productoRef = doc(db, coleccion, formProducto.idProducto)
    await updateDoc(productoRef, {
        Nombre: formProducto.nombre,
        Marca: formProducto.marca,
        UrlProducto: formProducto.urlProducto,
        Descripcion: formProducto.descripcion,
        EspecificacionesPc: formPc,
        EspecificacionesLaptop: formLaptop,
        EspecificacionesVideojuego: formVideojuego,
        EspecificacionesPeriferico: formPeriferico,
        EspecificacionesConsola: formConsola,
        Precio: formProducto.precio,
        Cantidad: formProducto.cantidad,
        Categoria: categoriaSelect,
        Etiqueta: etiquetaFinal,
        ImagenesUrl: fotosAntiguas,
    });
};

/**
 * It gets all the products from the database and returns them as an array of objects.
 * @returns An array of objects.
 */
export const getAllProducts = async () => {

    let products = [];

    const q = collection(db, colletionProducts);

    await getDocs(q).then((data) => {
        data.docs.forEach((element) => {
            products.push({ id: element.id, ...element.data() });
        });
    })
        .catch((error) => {
            console.log(error);
        });
    return products
}

/**
 * It gets all the products from the database and returns an array of objects with the name of each
 * product.
 * @returns An array of objects with the name of the product.
 */
export const getNamesAllProducts = async () => {

    let products = [];

    const q = collection(db, colletionProducts);

    await getDocs(q).then((data) => {
        data.docs.forEach((element) => {
            products.push({ nombre: element.data().Nombre });
        });
    })
        .catch((error) => {
            console.log(error);
        });
    return products
}

/**
 * It gets the products from the database by name.
 * @returns An array of objects of the products.
 */
export const getProductsByName = async (product) => {

    const q = query(collection(db, colletionProducts), where("Nombre", "==", product));
    let products = [];

    await getDocs(q)
        .then((data) => {

            data.docs.forEach((element) => {
                products.push({ id: element.id, ...element.data(), });
            });
        })
        .catch((error) => {
            console.log(error);
        });;
    return products;
}

/**
 * It gets the products from the database by category.
 * @returns An array of objects of the products.
 */
export const getProductsByCategory = async (category) => {
    const q = query(collection(db, colletionProducts), where("Categoria", "==", category));
    const products = [];
    await getDocs(q)
        .then((data) => {
            data.docs.forEach((element) => {
                products.push({ id: element.id, ...element.data(), });
            });
        })
        .catch((error) => {
            console.log(error);
        });;

    return products;
}

/**
 * It gets the products from the database by Etiqueta.
 * @returns An array of objects of products.
 */
export const getProductsByEtiqueta = async (searchInput) => {
    const q = query(collection(db, colletionProducts), where("Etiqueta", "array-contains-any", searchInput));
    let products = [];

    await getDocs(q)
        .then((data) => {

            data.docs.forEach((element) => {
                products.push({ id: element.id, ...element.data(), });
            });
        })
        .catch((error) => {
            console.log(error);
        });;

    return products
}

/**
 * It gets the products from the database by Keywords.
 * @returns An array of objects of the products.
 */
export const getProductsByKeywords = async (searchInput) => {
    const q = query(collection(db, colletionProducts), where("Keywords", "array-contains-any", searchInput));
    let products = [];

    await getDocs(q)
        .then((data) => {

            data.docs.forEach((element) => {
                products.push({ id: element.id, ...element.data(), });
            });
        })
        .catch((error) => {
            console.log(error);
        });;

    return products
}

/**
 * It gets all the products that have a discount and returns them in an array.
 * 
 * @return An array of objects.
 */
export const getProductsPromotions = async () => {
    const q = query(collection(db, colletionProducts), where("Descuento", "!=", 0));
    let products = [];


    await getDocs(q)
        .then((data) => {

            data.docs.forEach((element) => {
                products.push({ id: element.id, ...element.data(), });
            });
        })
        .catch((error) => {
            console.log(error);
        });;

    return products
}

/**
 * It gets all the products from the database and returns them as an array of objects.
 * @returns An array of objects.
 */
 export const getAllOrdersByID = async (id) => {
    const q = query(collection(db, colletionOrders), where("idCliente", "==", id));
    let orders = [];
    
    await getDocs(q).then((data) => {
        data.docs.forEach((element) => {
            orders.push({ id: element.id, ...element.data() });
        });
    })
        .catch((error) => {
            console.log(error);
        });
    return orders
}
