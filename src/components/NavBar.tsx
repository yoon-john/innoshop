import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Nav } from "react-bootstrap";
import axios from "axios";

interface Props {
  _cart: [any, any];
  category: string;
  assignSetCategory: (category: string) => void;
  search: string;
  assignSetSearch: (search: string) => void;
  cartActive: boolean;
  assignSetCartActive: (bool: boolean) => void;
}

const NavBar = ({
  _cart,
  category,
  assignSetCategory,
  search,
  assignSetSearch,
  cartActive,
  assignSetCartActive,
}: Props) => {
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [input, setInput] = useState("");
  const capitalizeAndReplace = (str: string) => {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized.replace(/-/g, " ");
  };
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => setCategories(categories.concat(res.data)));
  }, []);

  const handleClick = () => {
    assignSetSearch(input);
  };

  return (
    <>
      <Navbar className="navbar">
        <Container>
          <Navbar.Brand
            onClick={() => {
              assignSetCartActive(false);
              assignSetCategory("all");
              assignSetSearch("");
            }}
          >
            <div>
              <img
                alt=""
                src="src/assets/logo.svg"
                className="d-inline-block align-top"
              />{" "}
              <label>InnoShop</label>
            </div>
          </Navbar.Brand>

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              assignSetCartActive(false);
              handleClick();
            }}
          >
            <InputGroup>
              <NavDropdown
                title={capitalizeAndReplace(category)}
                id="navbarScrollingDropdown"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {categories.map((r, index) => (
                  <NavDropdown.Item
                    key={index}
                    onClick={() => {
                      assignSetCategory(r);
                      assignSetCartActive(false);
                    }}
                  >
                    {capitalizeAndReplace(r)}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Form.Control
                placeholder="Search InnoShop"
                aria-label="Search"
                aria-describedby="basic-addon1"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <button
                className="btn bg-white"
                type="button"
                onClick={() => {
                  handleClick();
                }}
              >
                <img
                  alt=""
                  src="src/assets/search.svg"
                  className="d-inline-block align-top"
                />
              </button>
            </InputGroup>
          </Form>
          <Nav.Link onClick={() => assignSetCartActive(true)}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                alt=""
                src="src/assets/cart.svg"
                className="d-inline-block align-top"
              />{" "}
              <p>Cart</p>
            </div>
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  );
};
export default NavBar;
