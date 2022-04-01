import classes from "./Button.module.scss";

const Button = (props) => {
  return (
    <button type="button" className={classes.greenBtn} onClick={props.onClick} disabled={props.disabled}>
      {!props.back && (
        <img className={classes.forward} alt="forward" src="./image/forward.svg" />
      )}
      {props.children}
      {props.back && <img className={classes.back} alt="back" src="./image/back.svg" />}
    </button>
  );
};

export default Button;
