import { Fragment, useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

import CartContext from "../../store/cart-context";
import Button from "../UI/Button";
import StateBlock from "../UI/StateBlock";
import classes from "./Cart.module.scss";
import CartItem from "./CartItem";

const Cart = (props) => {
  console.log("CART RENDER");
  const {
    cart,
    total,
    tax,
    setOrder,
    showHideCart,
    orderNumber,
    isOrderLoading,
  } = useContext(CartContext);
  const [isOrder, setIsOrder] = useState(false);
  const nav = useNavigate();

  const isCartEmpty = cart.length === 0;

  const setOrderHandler = () => {
    setIsOrder(true);
    setOrder(cart);
  };

  return (
    <Fragment>
      <div className={classes.cart}>
        <h3>Корзина</h3>
        {!isCartEmpty && (
          <>
            <div className={classes.cartItems}>
              {cart.map((item) => (
                <CartItem item={item} key={item.sId} />
              ))}
            </div>
            <div className={classes.priceInfo}>
              <div>
                <p>Итого:</p>
                <div className={classes.dash} />
                <span>{total} руб.</span>
              </div>
              <div>
                <p>Налог 5%:</p>
                <div className={classes.dash} />
                <span>{tax} руб.</span>
              </div>
              <Button
                back={isCartEmpty}
                disabled={isOrderLoading}
                onClick={setOrderHandler}
              >
                Офромить заказ
              </Button>
            </div>
          </>
        )}
        {isCartEmpty && !isOrder && (
          <StateBlock
            img="./image/empty_cart.png"
            title="Корзина пустая"
            info="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            back={isCartEmpty}
            onClick={showHideCart}
          >
            Вернуться назад
          </StateBlock>
        )}
        {isCartEmpty && isOrder && (
          <StateBlock
            img="./image/order.jpg"
            title="Заказ оформлен!"
            info={`Ваш заказ #${orderNumber} скоро будет передан курьерской доставке`}
            back={false}
            onClick={() => {
              showHideCart();
              nav("/orders", { replace: true });
            }}
          >
            Посмотреть заказы
          </StateBlock>
        )}
      </div>
      <div className={classes.overlay} onClick={showHideCart} />
    </Fragment>
  );
};

const CartSideBlock = (props) => {
  return ReactDOM.createPortal(
    <Cart showCart={props.showCart} />,
    document.getElementById("cart-sideBlock")
  );
};

export default CartSideBlock;
