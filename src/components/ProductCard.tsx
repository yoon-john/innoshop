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
  const [link, setLink] = useState("");
  useEffect(() => {
    axios.get("https://dummyjson.com/products/" + id).then((res) => {
      setProductDetail(res.data);
      setLink("/product/" + res.data.id);
    });
  }, [id]);
  // console.log(productDetail);
  return (
    // <a href={link}>
    <Card style={{ width: "18rem", height: "25rem", margin: "25px" }}>
      <Card.Img
        variant="top"
        style={{ height: "12rem", objectFit: "contain" }}
        src={productDetail.thumbnail}
      />
      <Card.Body>
        <h4>{productDetail.title}</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            clear: "both",
            textAlign: "center",
            height: "1rm",
          }}
        >
          <p className="brand">{productDetail.brand}</p>{" "}
          <img className="cart-img" alt="cart" src="src/assets/star.svg" />{" "}
          <p>{productDetail.rating}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingRight: "5px",
            clear: "both",
            textAlign: "center",
          }}
        >
          <h3 className="price">
            $
            {parseInt(
              (
                (productDetail.price *
                  (100 - productDetail.discountPercentage)) /
                100
              ).toString()
            )}
          </h3>{" "}
          <h4 className="old-price">${productDetail.price}</h4>
        </div>
        <AddToCart
          type="ProductCard"
          productId={productDetail.id}
          _cart={_cart}
        />
      </Card.Body>
    </Card>
    // </a>
  );
};
export default ProductCard;
