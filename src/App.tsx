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
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";

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
  const [cart, setCart] = useState(false);

  const initalCart = {
    id: 0,
    products: [],
    total: 0,
    discountedTotal: 0,
    userId: 0,
    totalProducts: 0,
    totalQuantity: 0,
  };
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["all"]);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => setCategories(categories.concat(res.data)));
  }, []);
  return (
    <Router>
      <NavBar _cart={[cart, setCart]}></NavBar>
      <div>
        {/* The React Router that makes the HTML above work */}
        <Routes>
          <Route path="/" element={<div />} />
          <Route
            path="/product/:id"
            element={
              <Product
                _category={[category, setCategory]}
                _cart={[cart, setCart]}
              />
            }
          />
          <Route path="/cart" element={<Cart _cart={[cart, setCart]} />} />
        </Routes>
      </div>
    </Router>
    // <>
    //   <NavBar />
    //   {/* {ids.map((id, index) => (
    //     <ProductCard key={index} id={id} />
    //   ))} */}
    //   <ProductPage id={1} _cart={[cart, setCart]} />
    // </>
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
      <NavBar _cart={_cart} />
      <ProductPage id={Number(id)} _cart={_cart} />
    </>
  );
}
export default App;
