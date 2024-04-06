import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";

interface Props {
  category: string;
  search: string;
  _cart: [any, any];
  cartActive: boolean;
}

const ProductList = ({ category, search, _cart, cartActive }: Props) => {
  const [ids, setIds] = useState<number[]>([]);
  console.log(search);
  useEffect(() => {
    if (search !== "") {
      console.log(search);
      axios
        .get(`https://dummyjson.com/products/search?q=${search}`)
        .then((res) => {
          const newIds: number[] = [];
          res.data.products.map((item: { id: never }) => newIds.push(item.id));
          setIds([...newIds]);
        });
    } else if (category === "all") {
      axios.get("https://dummyjson.com/products").then((res) => {
        const newIds: number[] = [];
        res.data.products.map((item: { id: never }) => newIds.push(item.id));
        setIds([...newIds]);
      });
    } else {
      axios
        .get("https://dummyjson.com/products/category/" + category)
        .then((res) => {
          const newIds: number[] = [];
          res.data.products.map((item: { id: never }) => newIds.push(item.id));
          setIds([...newIds]);
        });
    }
  }, [category, search]);
  if (cartActive) {
    if (_cart[0].products.length > 0) {
      return (
        <Row md="4">
          {_cart[0].products.map(
            (item: { id: number }, key: React.Key | null | undefined) => (
              <ProductCard key={key} id={item.id} _cart={_cart}></ProductCard>
            )
          )}
        </Row>
      );
    } else {
      return <h4 className="empty-message">Your Cart is Empty...</h4>;
    }
  } else {
    if (ids.length > 0) {
      return (
        <Row md="4">
          {ids.map((id, index) => (
            <Col key={index}>
              <ProductCard id={id} _cart={_cart} />
            </Col>
          ))}
        </Row>
      );
    } else {
      return <h4 className="empty-message">Your Search is Empty...</h4>;
    }
  }
};

export default ProductList;
