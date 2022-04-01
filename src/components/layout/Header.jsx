import { useContext } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import CartContext from "../../store/cart-context";
import CartSideBlock from "../cart/CartSideBlock";
import classes from "./Header.module.scss";

const Header = (props) => {
  const ctx = useContext(CartContext);

  return (
    <>
      <header className={classes.header}>
        <div className={classes.header__left}>
          <Link to={`${process.env.PUBLIC_URL}/`}>
            <img height={40} width={40} alt="logo" src="./image/logo.png" />
          </Link>
          <div>
            <h3>React Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
        <div className={classes.header__right}>
          <div className={classes.header__cart} onClick={ctx.showHideCart}>
            <i className="fas fa-light fa-shopping-cart"></i>
            <span>{ctx.total} руб.</span>
          </div>
          <Link to={`${process.env.PUBLIC_URL}/favourites`}>
            <img src="./image/favourites.svg" alt="favourites" />
          </Link>
          <Link to={`${process.env.PUBLIC_URL}/orders`}>
            <i className="fas fa-light fa-user-astronaut"></i>
          </Link>
        </div>
      </header>
      {/* {ctx.isCartShown && <CartSideBlock />} */}
      <CSSTransition
        in={ctx.isCartShown}
        timeout={200}
        classNames="cartSideBlock"
        unmountOnExit
      >
        <CartSideBlock />
      </CSSTransition>
    </>
  );
};
export default Header;
