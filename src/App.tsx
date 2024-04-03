import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCard from "./components/ProductCard";
import ProductPage from "./components/ProductPage";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

interface Cart {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

function App() {
  const initalCart = {
    id: 0,
    products: [],
    total: 0,
    discountedTotal: 0,
    userId: 0,
    totalProducts: 0,
    totalQuantity: 0,
  };
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState(false);
  let ids = Array.from({ length: 10 }, (_, index) => index + 1);
  return (
    <>
      <NavBar />
      {/* {ids.map((id, index) => (
        <ProductCard key={index} id={id} />
      ))} */}
      <ProductPage id={1} _cart={[cart, setCart]} />
    </>
  );
}

export default App;
