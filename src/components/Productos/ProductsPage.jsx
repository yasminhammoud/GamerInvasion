import React, { Component } from "react";
import { Checkbox } from "../Filter/Checkbox";
import { ProductsList } from "./ProductsList";
import { Col, Row, Container } from "react-bootstrap";


/* Class Componente that renders page of products that contains Filters and ProductCards */
export default class ProductsPage extends Component {
  state = {
    products: this.props.products,
    brands: this.props.products.reduce(
      (acc, cur) => ({ ...acc, [cur.Marca]: false }),
      {}
    )
  };

  handleChangeBrand = (e) => {
    const { name } = e.target;

    this.setState((prevState) => {
      return {
        brands: {
          ...prevState.brands,
          [name]: !prevState.brands[name]
        }
      };
    });
  };

  render() {

    if (this.props.products !== this.state.products) {
      this.setState({ products: this.props.products });
    }

    const getBrands = () => {
      const brandArray = [];
      this.props.products.forEach((product) =>
        brandArray.push(product.Marca.toLowerCase())
      );
      const auxArray = [...new Set(brandArray)];
      return auxArray;
    };

    const checkedProducts = Object.entries(this.state.brands)
      .filter((brand) => brand[1])
      .map((brand) => brand[0]);

    const filteredProducts = this.state.products.filter((prod) =>
      checkedProducts.includes(prod.Marca)
    );

    return (

      <Container className=" mt-7">
        <Row className="justify-content-center">

          <Col xs={8} md={8} lg={3} className="mb-4">
            <div style={{ textTransform: "capitalize", color: "white", border: "1px", borderColor: "white", "background": "linear-gradient(180deg, rgb(43, 0, 56) 20%, rgb(24, 0, 71) 100%)", borderRadius: "0.5rem", padding: "2rem", marginTop: "0.5rem" }}>

              {
                filteredProducts.length === 0
                  ? <span>{this.props.products.length} resultados</span>
                  : <span>{filteredProducts.length} resultados</span>
              }
              <br></br>
              <br></br>
              <h4> <b> Marcas </b>
              </h4>
              {getBrands().map((brand, index) => (
                <Checkbox
                  key={index}
                  id={index}
                  title={brand}
                  name={brand}
                  checked={this.state.brands.brand}
                  handleChange={this.handleChangeBrand}
                />
              ))}
            </div>
          </Col>
          <Col xs={12} md={12} lg={9}>
            <Row>
              <ProductsList
                products={
                  filteredProducts.length === 0
                    ? this.state.products
                    : filteredProducts
                }
              />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
