import React,{useState, useEffect}from "react";
//import {useHistory} from "react-router-dom";
import {categoriasTodas} from "../../../controllers/Categorias";
import {productoCrearCF} from "../../../controllers/Productos";
import {etiquetasTodas} from "../../../controllers/Etiquetas";
import GenerarUrl from "../../../utilities/GenerarUrl";
import "./CrearProducto.css";


//ESTADO INICIAL FORMULARIO PRODUCTO 
const initFormCategoria = {
    nombre: "",
    urlProducto: "",
    marca: "",
    precio: 0,
    cantidad: 0,
    descripcion: "",
};

//ESTADO INICIAL FORMULARIO Especificacion de Pc 
const initFormPc = {
    peso: "",
    dimensiones: "",
    procesador: "",
};

//ESTADO INICIAL FORMULARIO Especificacion de Laptop 
const initFormLaptop = {
    peso: "",
    dimensiones: "",
    procesador: "",
};

//ESTADO INICIAL FORMULARIO Especificacion de Videojuegos
const initFormVideojuego = {
    peso: "",
    dimensiones: "",
    procesador: "",
};

//ESTADO INICIAL FORMULARIO Especificacion de Perifericos 
const initFormPeriferico = {
    peso: "",
    dimensiones: "",
    procesador: "",
};

//ESTADO INICIAL FORMULARIO Especificacion de Consolas
const initFormConsola = {
    peso: "",
    dimensiones: "",
    procesador: "",
};

const CrearProductos = () => {
  //const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelect, setCategoriaSelect] = useState(
    "Seleccione la categoria"
  );
  const [estadoEtiqueta, setEstadoEtiqueta] = useState(false);
  const [etiquetas, setEtiquetas] = useState( []);
  const [formEtiqueta, setFormEtiqueta]=useState({});
  const [formProducto, setFormProducto]=useState(initFormCategoria);
  const [formPc, setFormPc] = useState(initFormPc);
  const [formLaptop, setFormLaptop] = useState(initFormLaptop);
  const [formVideojuego, setFormVideojuego] = useState(initFormVideojuego);
  const [formPeriferico, setFormPeriferico] = useState(initFormPeriferico);
  const [formConsola, setFormConsola] = useState(initFormConsola);
  const [fotos, setFotos] = useState([]);
  const [fotosVista, setFotosVista] = useState([]);

  useEffect (() => {
    (async () => {
        const categoriaDB = await categoriasTodas ();
        setCategorias(categoriaDB);
        const etiquetaDB = await etiquetasTodas ();
        setEtiquetas(etiquetaDB);
    })();
  }, []);

    const cambiarDatos = (e) => {
        const{name, value}=e.target;
        setFormProducto({
          ...formProducto,
          [name]: value,
        });
    };

    const cambiarDatosPc = (e) => {
        const{name, value}=e.target;
        setFormPc({
          ...formPc,
          [name]: value,
        });
    };

    const cambiarDatosLaptop = (e) => {
        const{name, value}=e.target;
        setFormLaptop({
          ...formLaptop,
          [name]: value,
        });
    };

    const cambiarDatosVideojuego = (e) => {
        const{name, value}=e.target;
        setFormVideojuego({
          ...formVideojuego,
          [name]: value,
        });
    };

    const cambiarDatosPeriferico = (e) => {
        const{name, value}=e.target;
        setFormPeriferico({
          ...formPeriferico,
          [name]: value,
        });
    };

    const cambiarDatosConsola = (e) => {
        const{name, value}=e.target;
        setFormConsola({
          ...formConsola,
          [name]: value,
        });
    };

    const cambiarFotos = (e) => {
        if (e.target.files){
            const fotosArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL (file)
            );
            const fotosArray2 = Array.from(e.target.files);

            setFotos((prevImages) => prevImages.concat(fotosArray));
            Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));

            setFotosVista((prevImages) => prevImages.concat( fotosArray2));
        }
    };

    const cambiarCategoria = (e) => {
        setCategoriaSelect (e.target.value);
    };

    const abrirEtiqueta = () => {
        setEstadoEtiqueta(!estadoEtiqueta);
    };

    const cambiarEtiqueta = (event) => {
        setFormEtiqueta({
          ...formEtiqueta,
            [event.target.name]: event.target.checked,
          });
        };
    
    function escogerEtiqueta (etiquetasSeleccionadas){
        const etiquetaArray = Object.entries(etiquetasSeleccionadas);
        const etiquetaFiltrada = etiquetaArray.filter(function ([key, value]){
            return value === true;
        });
        const etiquetasEnviar = Object.keys(Object.fromEntries(etiquetaFiltrada));
        return etiquetasEnviar;
    }

    function onBlur (){
        setFormProducto({
           ...formProducto,
           urlProducto: GenerarUrl(formProducto.nombre),
        });
    }
    
    const eliminarFoto = (index) => {
        if (index > -1) { 
            const nuevaFotoArray = [...fotos];
            nuevaFotoArray.splice(
                nuevaFotoArray.findIndex((item) => item.id === index),
                1
            );

            setFotos (nuevaFotoArray);
            const nuevaFotoArray2 = [...fotosVista];
            nuevaFotoArray2.splice(
                nuevaFotoArray2.findIndex( (item) => item.id === index),
                1
            );
            setFotosVista(nuevaFotoArray2);
        }
    };

    const crearProducto = (e) => {
        e.preventDefault();
    const etiquetaFinal = escogerEtiqueta(formEtiqueta);
    productoCrearCF(formPc,formLaptop,formVideojuego,formPeriferico,formConsola, formProducto, categoriaSelect, etiquetaFinal, fotosVista);
    // history.push(`/administrador/productos`);
    };
                          
    return (
        <div className = "contenedor-crear-categorias">
            <h2>Crear Producto</h2>
            <form onSubmit = {crearProducto}>
                <h4>Nombre:</h4>
                <input
                    type="text"
                    required
                    name = "nombre"
                    placeholder = "Nambre del producto"
                    value = {formProducto.nombre}
                    onChange = {cambiarDatos}
                    onBlur = {onBlur}
                />
                <h4>URL:</h4>
                <input
                    type="text"
                    disabled
                    required
                    defaultValue = {GenerarUrl(formProducto.nombre)}
                    placeholder = "URL del producto"
                />
                <h4>Categoria:</h4>
                <select onChange={cambiarCategoria} value={categoriaSelect}>
                    <option disabled value={"Seleccione la categoria"}>
                        Seleccione la categoria
                    </option>
                    {categorias.map((categoria) => (
                        <option key={categoria.IdCategoria} value={categoria.Nombre}>
                            {categoria.Nombre}
                        </option>
                    ))}
                </select>

                <div
					className={`App ${
						categoriaSelect !== "pc desktop"
							? "invisible"
							: "visible"
						}`}
					>
						<h3>Peso:</h3>
							<input
								type="text"
                                name = "peso"
                                placeholder = "Peso del Pc"
                                value = {formPc.peso}
                                onChange = {cambiarDatosPc}
							/>
                        <h3>Dimensiones:</h3>
							<input
								type="text"
                                name = "dimensiones"
                                placeholder = "Dimensiones del Pc"
                                value = {formPc.dimensiones}
                                onChange = {cambiarDatosPc}
							/>
                        <h3>Procesador:</h3>
							<input
								type="text"
                                name = "procesador"
                                placeholder = "Procesador del Pc"
                                value = {formPc.procesador}
                                onChange = {cambiarDatosPc}
							/>
                </div>

                <div
					className={`App ${
						categoriaSelect !== "laptops"
							? "invisible"
							: "visible"
						}`}
					>
						<h3>Peso:</h3>
							<input
								type="text"
                                name = "peso"
                                placeholder = "Peso de la laptop"
                                value = {formLaptop.peso}
                                onChange = {cambiarDatosLaptop}
							/>
                        <h3>Dimensiones:</h3>
							<input
								type="text"
                                name = "dimensiones"
                                placeholder = "Dimensiones de la laptop"
                                value = {formLaptop.dimensiones}
                                onChange = {cambiarDatosLaptop}
							/>
                        <h3>Procesador:</h3>
							<input
								type="text"
                                name = "procesador"
                                placeholder = "Procesador de la laptop"
                                value = {formLaptop.procesador}
                                onChange = {cambiarDatosLaptop}
							/>
                </div>

                <div
					className={`App ${
						categoriaSelect !== "videojuegos"
							? "invisible"
							: "visible"
						}`}
					>
						<h3>Peso:</h3>
							<input
								type="text"
                                name = "peso"
                                placeholder = "Peso del videojuego"
                                value = {formVideojuego.peso}
                                onChange = {cambiarDatosVideojuego}
							/>
                        <h3>Dimensiones:</h3>
							<input
								type="text"
                                name = "dimensiones"
                                placeholder = "Dimensiones del videojuego"
                                value = {formVideojuego.dimensiones}
                                onChange = {cambiarDatosVideojuego}
							/>
                        <h3>Procesador:</h3>
							<input
								type="text"
                                name = "procesador"
                                placeholder = "Procesador del videojuego"
                                value = {formVideojuego.procesador}
                                onChange = {cambiarDatosVideojuego}
							/>
                </div>

                <div
					className={`App ${
						categoriaSelect !== "perifericos"
							? "invisible"
							: "visible"
						}`}
					>
						<h3>Peso:</h3>
							<input
								type="text"
                                name = "peso"
                                placeholder = "Peso del periferico"
                                value = {formPeriferico.peso}
                                onChange = {cambiarDatosPeriferico}
							/>
                        <h3>Dimensiones:</h3>
							<input
								type="text"
                                name = "dimensiones"
                                placeholder = "Dimensiones del periferico"
                                value = {formPeriferico.dimensiones}
                                onChange = {cambiarDatosPeriferico}
							/>
                        <h3>Procesador:</h3>
							<input
								type="text"
                                name = "procesador"
                                placeholder = "Procesador del periferico"
                                value = {formPeriferico.procesador}
                                onChange = {cambiarDatosPeriferico}
							/>
                </div>

                <div
					className={`App ${
						categoriaSelect !== "consolas"
							? "invisible"
							: "visible"
						}`}
					>
						<h3>Peso:</h3>
							<input
								type="text"
                                name = "peso"
                                placeholder = "Peso de la consola"
                                value = {formConsola.peso}
                                onChange = {cambiarDatosConsola}
							/>
                        <h3>Dimensiones:</h3>
							<input
								type="text"
                                name = "dimensiones"
                                placeholder = "Dimensiones de la consola"
                                value = {formConsola.dimensiones}
                                onChange = {cambiarDatosConsola}
							/>
                        <h3>Procesador:</h3>
							<input
								type="text"
                                name = "procesador"
                                placeholder = "Procesador de la consola"
                                value = {formConsola.procesador}
                                onChange = {cambiarDatosConsola}
							/>
                </div>
                
                <h4>Etiqueta:</h4>
                <div>
                    <div className="contenedor-select" onClick={abrirEtiqueta}>
                        <select>
                        {etiquetas?.length === 0 ? (
                            <option defaultValue={false}>No tiene etiquetas</option>
                        ) : (
                            <option>Selecciona una etiqueta</option>
                        )}
                        </select>
                        <div className="ocultar-select"> </div>
                    </div>
                    <div
                        className="contenedor-check"
                        style= {{
                            display:
                                estadoEtiqueta && etiquetas.length !== 0 ? "block" : "none",
                        }}
                    >
                        {etiquetas.map((etiqueta) => (
                            <label key={etiqueta.IdEtiqueta}>
                                {etiqueta.Nombre}
                                <input
                                    type="checkbox"
                                    name={etiqueta.Nombre}
                                    checked={formEtiqueta[etiqueta.IdEtiqueta]}
                                    onChange={cambiarEtiqueta}
                                />  
                            </label>
                        ))}
                    </div>
                </div>
                <h4>Marca:</h4>
                <input
                    type="text"
                    required
                    name="marca"
                    placeholder ="Marca del producto"
                    value-={formProducto.marca}
                    onChange={cambiarDatos}
                />
                <h4> Precio: </h4>
                    <input
                        type="number"
                        required
                        name="precio"
                        placeholder="Precio del producto"
                        step={1}
                        precision={2}
                        min={1}
                        value={formProducto.precio}
                        onChange={cambiarDatos}
                    />
                <h4> Cantidad:</h4>
                <input
                    type="number"
                    required
                    name="cantidad"
                    placeholder="Cantidad de productos"
                    min={1}
                    step={1}
                    value={formProducto.cantidad}
                    onChange={cambiarDatos}
                />
                <h4>Descripción:</h4>
                <textarea
                    name="descripcion"
                    required
                    cols="30"
                    rows="8"
                    placeholder="Describe el producto"
                    value={formProducto.descripcion}
                    onChange={cambiarDatos}
                ></textarea>
                <h4> Imagenes: </h4>
                <input
                    type="file"
                    id="file"
                    required
                    multiple
                    onChange={cambiarFotos}
                />
                <div className="contenedor-imagenes-categorias">
                    <div className="contenedor-card-categorias">
                        {fotos.map((photo, index) => (
                            <div key={index}>
                                <img src={photo} alt=""/>
                                <div
                                onClick={() => eliminarFoto(index)}
                                className={"boton-eliminar"}
                            >
                                Eliminar
                            </div>
                    </div>
                ))}
            </div>
        </div>
        <input
            className="boton-formulario"
            type="submit"
            value="Crear Producto"
        />
        </form>
        </div>
    );
};

export default CrearProductos;