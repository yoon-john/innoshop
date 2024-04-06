import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import BrowsePage from "./components/BrowsePage";

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
  const [cart, setCart] = useState(initalCart);

  return <BrowsePage _cart={[cart, setCart]} />;
}
export default App;
