import React, { useCallback, useEffect, useState } from "react";
import useHttp from "../hooks/use-http";

const CartContext = React.createContext({
  cart: [],
  total: 0,
  tax: 0,
  isCartShown: false,
  addItem: () => {},
  deleteItem: () => {},
  showHideCart: () => {},
  setOrder: (cart) => {},
  orderNumber: 0,
  isOrderLoading: false,
});

export default CartContext;

const InitialCart = JSON.parse(localStorage.getItem("cart"));

export const CartContextProvider = (props) => {
  const [cart, setCart] = useState(InitialCart || []);
  const [totalCart, setTotalCart] = useState({ total: 0, tax: 0 });
  const [isCartShown, setIsCartShown] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const { sendRequest } = useHttp();

  useEffect(() => {
    const total = cart.reduce((prev, next) => {
      return prev + +next.price.replaceAll(" ", "");
    }, 0);
    const tax = (total * 0.05).toFixed(2);
    setTotalCart({ total, tax });
  }, [cart]);

  const addItem = (item) => {
    localStorage.setItem("cart", JSON.stringify([...cart, item]));
    setCart((prevState) => [...prevState, item]);
  };

  const deleteItem = (sId) => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart.filter((elem) => elem.sId !== sId))
    );
    setCart((prevState) => prevState.filter((elem) => elem.sId !== sId));
  };

  const showHideCart = () => {
    setIsCartShown((prevState) => !prevState);
  };

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem("cart");
  }, []);

  const setOrder = useCallback(
    async (cart) => {
      setIsOrderLoading(true);
      sendRequest(
        {
          method: "post",
          url: `/orders`,
          data: { items: cart },
        },
        false,
        (data) => {
          setOrderNumber(data.id);
          setIsOrderLoading(false);
          clearCart();
        }
      );
    },
    [sendRequest, clearCart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        total: totalCart.total,
        tax: totalCart.tax,
        isCartShown,
        addItem,
        deleteItem,
        showHideCart,
        setOrder,
        orderNumber,
        isOrderLoading,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
