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
      axios.get(`http://localhost:5000/api/search?q=${search}`).then((res) => {
        setIds(res.data);
      });
    } else if (category === "all") {
      axios.get("https://dummyjson.com/products").then((res) => {
        const newIds: React.SetStateAction<never[]> = [];
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
    return (
      <div>
        {_cart[0].products.map(
          (item: { id: number }, key: React.Key | null | undefined) => (
            <ProductCard key={key} id={item.id} _cart={_cart}></ProductCard>
          )
        )}
      </div>
    );
  } else {
    return (
      <Row md="4">
        {ids.map((id, index) => (
          <Col key={index}>
            <ProductCard id={id} _cart={_cart} />
          </Col>
        ))}
      </Row>
    );
  }
};

export default ProductList;
