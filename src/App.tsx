import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCard from "./components/ProductCard";
import ProductPage from "./components/ProductPage";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useParams,
} from "react-router-dom";
import ProductList from "./components/ProductList";
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

  return (
    // <Router>
    //   <div>
    //     {/* The React Router that makes the HTML above work */}
    //     <Routes>
    //       <Route path="/" element={<BrowsePage _cart={[cart, setCart]} />} />
    //       {/* <Route
    //         path="/product/:id"
    //         element={
    //           <Product
    //             _category={[category, setCategory]}
    //             _cart={[cart, setCart]}
    //           />
    //         }
    //       /> */}
    //       <Route path="/cart" element={<Cart _cart={[cart, setCart]} />} />
    //     </Routes>
    //   </div>
    // </Router>
    // // <>
    //   <NavBar />
    //   {/* {ids.map((id, index) => (
    //     <ProductCard key={index} id={id} />
    //   ))} */}
    //   <ProductPage id={1} _cart={[cart, setCart]} />
    // </>
    <BrowsePage _cart={[cart, setCart]} />
  );
}

function Product({
  _category,
  _cart,
}: {
  _category: [any, any];
  _cart: [any, any];
}) {
  let { id } = useParams();

  return (
    <>
      <ProductPage id={Number(id)} _cart={_cart} />
    </>
  );
}
export default App;
