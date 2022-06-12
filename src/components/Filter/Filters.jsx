import RadioButton from './RadioButton';
import React, { useState, useEffect, useContext } from 'react'
import { Contexto } from "../../contexts/Contexto"
import { useNavigate } from 'react-router-dom';

export const Filters = (props) => {

  const { products } = useContext(Contexto);
  const navigate = useNavigate();
  const [data, setData] = useState(props.productos);

  const getBrands = () => {
    const brandArray = [];
    data.forEach(product => brandArray.push(product.Marca.toLowerCase()))
    const auxArray = [...new Set(brandArray)]
    return auxArray
  }

  useEffect(() => {
    setData(props.productos)
  }, [props.productos]);


  const filterByBrand = (brand) => {
    return products.filter(producto => producto.Marca === brand)
  }

  const filterByPrice = (option) => {
    if (option === 1) {
      return products.filter(producto => parseInt(producto.Precio) <= 500)
    } else if (option === 2) {
      return products.filter(producto => parseInt(producto.Precio) > 500 && parseInt(producto.Precio) <= 1000)
    } else {
      return products.filter(producto => parseInt(producto.Precio) > 1000)
    }
  }


  const onChangeValueBrand = (event) => {
    const brand = event.target.value
    const filteredProducts = filterByBrand(brand)
    navigate("/store/filters?brand=" + brand, {
      state: {
        datos: filteredProducts
      }
    })
  }

  const onChangeValuePrice = (event) => {
    const price = event.target.value
    const filteredProducts = filterByPrice(parseInt(price))
    navigate("/store/filters?price=" + price, {
      state: {
        datos: filteredProducts
      }
    })
  }

  return (
    <>
      <div>
        <h4> <b> Marcas </b>
        </h4>
        <form onChange={onChangeValueBrand}>
          {getBrands().map(marca => <RadioButton value={marca} />)}
        </form>
        <br></br>
        <h4> <b> Precios </b>
        </h4>
        <form onChange={onChangeValuePrice}>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={1} />
            <label class="form-check-label" for="flexRadioDefault1">
              Menor 500$
            </label>

          </div>
          <div class="form-check">

            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={2} />
            <label class="form-check-label" for="flexRadioDefault1">
              Entre 501-1000$
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={3} />
            <label class="form-check-label" for="flexRadioDefault1">
              Mayor 1000$
            </label>
          </div>
        </form>
      </div>
    </>
  );
};