import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import AddToCart from "./AddToCart";

interface Props {
  id: number;
  _cart: [any, any];
}

const ProductCard = ({ id, _cart }: Props) => {
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
    axios
      .get("https://dummyjson.com/products/" + id)
      .then((res) => setProductDetail(res.data));
  }, [id]);
  // console.log(productDetail);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={productDetail.thumbnail} />
      <Card.Body>
        <h4>{productDetail.title}</h4>
        <p className="brand">{productDetail.brand}</p>{" "}
        <p>{productDetail.rating}</p>
        <h3 className="price">
          $
          {parseInt(
            (
              (productDetail.price * (100 - productDetail.discountPercentage)) /
              100
            ).toString()
          )}
        </h3>
        <h4 className="old-price">${productDetail.price}</h4>
        <AddToCart
          type="ProductCard"
          productId={productDetail.id}
          _cart={_cart}
        />
      </Card.Body>
    </Card>
  );
};
export default ProductCard;
