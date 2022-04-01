import Button from "./Button";
import classes from "./StateBlock.module.scss";

const StateBlock = (props) => {
  return (
    <div className={classes.stateBlock}>
      <img src={props.img} alt={props.title} />
      <h4>{props.title}</h4>
      <p>{props.info}</p>
      <Button back={props.back} onClick={props.onClick}>
        {props.children}
      </Button>
    </div>
  );
};

export default StateBlock;
