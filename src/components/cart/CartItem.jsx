import { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./CartItem.module.scss";

const CartItem = (props) => {
  const { image, info, price, sId } = props.item;
  const ctx = useContext(CartContext);

  return (
    <div className={classes.cartItem}>
      <img width={70} height={70} alt={info} src={image} />
      <div className={classes.cartItem__info}>
        <p>{info}</p>
        <span>{price} руб.</span>
      </div>
      <button type="button" onClick={() => ctx.deleteItem(sId)}>
        <img width={11} height={11} alt="delete" src="./image/delete.svg" />
      </button>
    </div>
  );
};

export default CartItem;
