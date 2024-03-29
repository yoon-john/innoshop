import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCard from "./components/ProductCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <ProductCard id={1} />
    </>
  );
}

export default App;
