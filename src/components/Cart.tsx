import React from "react";
import ProductPage from "./ProductPage";
import ProductCard from "./ProductCard";
import NavBar from "./NavBar";

interface Props {
  _cart: [any, any];
}

const Cart = ({ _cart }: Props) => {
  return (
    <div>
      {_cart.map((item, key) => (
        <ProductCard key={key} id={item.id} _cart={_cart}></ProductCard>
      ))}
    </div>
  );
};

export default Cart;
