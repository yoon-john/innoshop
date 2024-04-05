import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

interface Props {
  category: string;
  _cart: [any, any];
}

const ProductList = ({ category, _cart }: Props) => {
  const [ids, setIds] = useState<number[]>([]);
  useEffect(() => {
    if (category === "all") {
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
  }, [category]);
  return (
    <>
      {ids.map((id, index) => (
        <Col key={index}>
          <ProductCard id={id} _cart={_cart} />
        </Col>
      ))}
    </>
  );
};

export default ProductList;
