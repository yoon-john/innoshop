import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ProductCard from "./ProductCard";
import AddToCart from "./AddToCart";

interface Props {
  id: number;
  _cart: [any, any];
}

const ProductPage = ({ id, _cart }: Props) => {
  const initialProduct = {
    id: -1,
    title: "",
    description: "",
    price: -1,
    discountPercentage: -1,
    rating: -1,
    stock: -1,
    brand: "",
    category: "",
    thumbnail: "",
    images: [],
  };
  const [productDetail, setProductDetail] = useState(initialProduct);
  const [error, setError] = useState("");
  const [ids, setIds] = useState([]);
  if (productDetail === initialProduct) {
    axios
      .get("https://dummyjson.com/products/" + id)
      .then((res) => setProductDetail(res.data))
      .catch((err) => setError(err));
  }
  if (productDetail.category != "" && ids.length == 0) {
    axios
      .get("https://dummyjson.com/products/category/" + productDetail.category)
      .then((res) => {
        res.data.products.map((item: { id: never }) =>
          productDetail.id == item.id ? null : ids.push(item.id)
        );
        setIds(ids.slice(0, 4));
      });
  }

  return (
    <Container>
      <Row>
        <Col>
          <Carousel>
            <Carousel.Item key={0}>
              <img className="d-block w-100" src={productDetail.thumbnail} />
            </Carousel.Item>
            {productDetail.images
              .slice(0, productDetail.images.length - 1)
              .map((image, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={image} />
                </Carousel.Item>
              ))}
          </Carousel>
        </Col>
        <Col>
          <h2>{productDetail.title}</h2>
          <h3 className="brand">{productDetail.brand}</h3>
          <p>{productDetail.rating}</p>
          <p>{productDetail.description}</p>
          <h3 className="price">
            $
            {parseInt(
              (
                (productDetail.price *
                  (100 - productDetail.discountPercentage)) /
                100
              ).toString()
            )}
          </h3>
          <h4 className="old-price">${productDetail.price}</h4>
          <AddToCart
            type="ProductPage"
            productId={productDetail.id}
            _cart={_cart}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>More {productDetail.category}</h3>
        </Col>
        <Col>
          <p style={{ textAlign: "right" }}>More {">"}</p>
        </Col>
      </Row>
      <Row>
        {ids.map((id, index) => (
          <Col key={index}>
            <ProductCard id={id} _cart={_cart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductPage;
