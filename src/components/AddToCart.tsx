import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

interface Props {
  type: string;
  productId: number;
  _cart: [any, any];
}

const AddToCart = ({ type, productId, _cart }: Props) => {
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = _cart;
  const handleAddClick = () => {
    if (!cart) {
      axios
        .post("https://dummyjson.com/carts/add", {
          userId: 1,
          products: [
            {
              id: productId,
              quantity: 1,
            },
          ],
        })
        .then((res) => {
          setCart(res.data);
        });
      setQuantity(1);
    } else if (
      !cart.products.some((product: { id: number }) => product.id === productId)
    ) {
      cart.products.push({ id: productId, quantity: 1 });
      setQuantity(1);
      // Following put request will fail, as the new cart is not in server.
      //   axios
      //     .put("https://dummyjson.com/carts/" + cart.id, {
      //       merge: true,
      //       products: cart.products,
      //     })
      //     .then((res) => setCart(res.data));
    } else if (
      cart.products.some((product: { id: number }) => product.id === productId)
    ) {
      let index = cart.products.findIndex(
        (product: { id: number }) => product.id === productId
      );
      cart.products[index].quantity++;
      setQuantity(cart.products[index].quantity);
      // Following put request will fail, as the new cart is not in server.
      //   axios
      //     .put("https://dummyjson.com/carts/" + cart.id, {
      //       merge: true,
      //       products: cart.products,
      //     })
      //     .then((res) => setCart(res.data))
      //     .catch((err) => console.log(err));
    }
  };
  const handleSubClick = () => {
    let index = cart.products.findIndex(
      (product: { id: number }) => product.id === productId
    );
    if (cart.products[index].quantity > 1) {
      cart.products[index].quantity--;
      setQuantity(cart.products[index].quantity);
    } else if (cart.products[index].quantity == 1) {
      cart.products.splice(index, 1);
      const newCart = JSON.parse(JSON.stringify(cart));
      setQuantity(0);
      setCart(newCart);
    }
    // Following put request will fail, as the new cart is not in server.
    //   axios
    //     .put("https://dummyjson.com/carts/" + cart.id, {
    //       merge: true,
    //       products: cart.products,
    //     })
    //     .then((res) => setCart(res.data))
    //     .catch((err) => console.log(err));
  };
  if (type === "ProductCard") {
    if (
      !cart ||
      !cart.products.some((product: { id: number }) => product.id === productId)
    ) {
      return (
        <Button bsPrefix="circular-button" onClick={() => handleAddClick()}>
          <img
            className="cart-img"
            alt="cart"
            src="src/assets/black-cart.svg"
          />{" "}
        </Button>
      );
    } else if (
      cart.products.some((product: { id: number }) => product.id === productId)
    ) {
      let _quantity =
        cart.products[
          cart.products.findIndex(
            (product: { id: number }) => product.id === productId
          )
        ].quantity;
      return (
        <h3>
          <Row style={{ flexShrink: 0 }}>
            <Col>
              <Button
                bsPrefix="circular-button"
                onClick={() => handleSubClick()}
              >
                -
              </Button>
            </Col>
            <Col>{_quantity}</Col>
            <Col>
              <Button
                bsPrefix="circular-button"
                onClick={() => handleAddClick()}
              >
                +
              </Button>
            </Col>
          </Row>
        </h3>
      );
    }
  } else if (type === "ProductPage") {
    if (
      !cart ||
      !cart.products.some((product: { id: number }) => product.id === productId)
    ) {
      return (
        <Button bsPrefix="large-btn" onClick={() => handleAddClick()}>
          <h4>Add to Cart</h4>
        </Button>
      );
    } else if (
      cart.products.some((product: { id: number }) => product.id === productId)
    ) {
      let _quantity =
        cart.products[
          cart.products.findIndex(
            (product: { id: number }) => product.id === productId
          )
        ].quantity;
      return (
        <h2>
          <Row>
            <Col>
              <Button
                bsPrefix="circular-button"
                onClick={() => handleSubClick()}
              >
                -
              </Button>
            </Col>
            <Col>{_quantity}</Col>
            <Col>
              <Button
                bsPrefix="circular-button"
                onClick={() => handleAddClick()}
              >
                +
              </Button>
            </Col>
          </Row>
        </h2>
      );
    }
  }
};

export default AddToCart;
