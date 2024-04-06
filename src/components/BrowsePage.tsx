import React, { useState } from "react";
import NavBar from "./NavBar";
import ProductList from "./ProductList";

interface Props {
  _cart: [any, any];
}

const BrowsePage = ({ _cart }: Props) => {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cartActive, setCartActive] = useState(false);

  return (
    <div>
      <NavBar
        _cart={_cart}
        category={category}
        assignSetCategory={(str) => setCategory(str)}
        search={search}
        assignSetSearch={(str) => setSearch(str)}
        cartActive={cartActive}
        assignSetCartActive={(bool) => setCartActive(bool)}
      />
      <ProductList
        category={category}
        search={search}
        _cart={_cart}
        cartActive={cartActive}
      />
    </div>
  );
};

export default BrowsePage;
