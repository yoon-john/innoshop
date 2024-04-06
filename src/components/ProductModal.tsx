import React, { useEffect, useState } from "react";
import {
  Button,
  Carousel,
  Col,
  Container,
  Modal,
  ModalProps,
  Row,
} from "react-bootstrap";
import { Omit, BsPrefixProps } from "react-bootstrap/esm/helpers";
import { JSX } from "react/jsx-runtime";
import AddToCart from "./AddToCart";
import ProductCard from "./ProductCard";
import axios from "axios";

interface Props {
  show: boolean;
  id: number;
  _cart: [any, any];
  onHide: () => void;
}

const ProductModal = ({ id, _cart, show, onHide }: Props) => {
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
  useEffect(() => {
    if (show === true) {
      axios
        .get("https://dummyjson.com/products/" + id)
        .then((res) => setProductDetail(res.data));
    }
  }, [show]);
  return (
    <Modal
      {...{ show, onHide }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container style={{ padding: "50px" }}>
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
      </Container>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
