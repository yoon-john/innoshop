import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Nav } from "react-bootstrap";
import axios from "axios";

const NavBar = () => {
  const [category, setCategory] = useState("All");
  let [categories, setCategories] = useState<string[]>(["all"]);
  const capitalizeAndReplace = (str: string) => {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized.replace(/-/g, " ");
  };
  if (categories.length == 1) {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => setCategories(categories.concat(res.data)));
    // console.log(categories);
  } else {
    return (
      <Navbar className="navbar">
        <Container>
          <Navbar.Brand href="/">
            <div>
              <img
                alt=""
                src="src/assets/logo.svg"
                className="d-inline-block align-top"
              />{" "}
              <label>InnoShop</label>
            </div>
          </Navbar.Brand>

          <Form>
            <InputGroup>
              <NavDropdown
                title={capitalizeAndReplace(category)}
                id="basic-nav-dropdown"
              >
                {categories.map((r, index) => (
                  <NavDropdown.Item key={index} onClick={() => setCategory(r)}>
                    {capitalizeAndReplace(r)}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Form.Control
                placeholder="Search InnoShop"
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
              <button className="btn bg-white" type="submit">
                <img
                  alt=""
                  src="src/assets/search.svg"
                  className="d-inline-block align-top"
                />
              </button>
            </InputGroup>
          </Form>
          <Nav.Link href="/cart">
            <img
              alt=""
              src="src/assets/cart.svg"
              className="d-inline-block align-top"
            />{" "}
            <p>Cart</p>
          </Nav.Link>
        </Container>
      </Navbar>
    );
  }
};
export default NavBar;
