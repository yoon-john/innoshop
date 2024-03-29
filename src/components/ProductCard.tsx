import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

interface Props {
  id: number;
}

const ProductCard = ({ id }: Props) => {
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
  if (productDetail === initialProduct) {
    axios
      .get("https://dummyjson.com/products/" + id)
      .then((res) => setProductDetail(res.data));
  }
  console.log(productDetail);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={productDetail.thumbnail} />
      <Card.Body>
        <Card.Title>{productDetail.title}</Card.Title>
        <Card.Subtitle>{productDetail.brand} </Card.Subtitle>
        <Card.Subtitle>{productDetail.rating}</Card.Subtitle>
        <Card.Text>${productDetail.price}</Card.Text>
        <Card.Text>
          $
          {parseInt(
            (productDetail.price / (100 - productDetail.discountPercentage)) *
              100
          )}
        </Card.Text>
        <Button variant="primary">
          <img
            alt=""
            src="src/assets/cart.png"
            className="d-inline-block align-top"
          />{" "}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
