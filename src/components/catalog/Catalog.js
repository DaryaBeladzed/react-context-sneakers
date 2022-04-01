import { useContext, useEffect } from "react";

import GridCatalog from "./GridCatalog";
import Search from "./Search";
import classes from "./Catalog.module.scss";
import { SneakersContext } from "../../store/sneakers-context";
import { useLocation, useNavigate } from "react-router-dom";
import StateBlock from "../UI/StateBlock";

const Catalog = (props) => {
  const { getFavourites, sneakers, favourites, getOrders, orders } =
    useContext(SneakersContext);
  const location = useLocation().pathname;
  const nav = useNavigate();

  useEffect(() => {
    if (location !== "/orders") getFavourites(location === "/favourites");
    else getOrders();
  }, [getFavourites, location, getOrders]);

  const backHandler = () => {
    nav("/");
  };

  const isShowHeader =
    (location === "/favourites" && favourites.length !== 0) ||
    (location === "/orders" && orders.length !== 0) ||
    location === "/";

  return (
    <section className={classes.catalog}>
      {isShowHeader && (
        <div className={classes.catalog__header}>
          <div>
            {location !== "/" && (
              <button type="button" onClick={backHandler}>
                <img src="/image/back_gr.svg" alt="back" />
              </button>
            )}
            <h2>{props.title}</h2>
          </div>
          {location === "/" && <Search />}
        </div>
      )}
      {location === "/" && <GridCatalog catalog={sneakers} />}
      {location === "/favourites" && favourites.length !== 0 && (
        <GridCatalog catalog={favourites} />
      )}
      {location === "/favourites" && favourites.length === 0 && (
        <StateBlock
          img="./image/smile_2.png"
          title="Закладок нет :("
          info="Вы ничего не добавляли в закладки"
          back={true}
          onClick={backHandler}
        >
          Вернуться назад
        </StateBlock>
      )}
      {location === "/orders" && orders.length !== 0 && (
        <GridCatalog catalog={orders} />
      )}
      {location === "/orders" && orders.length === 0 && (
        <StateBlock
          img="./image/smile_1.png"
          title="У вас нет заказов"
          info="Вы нищеброд? Оформите хотя бы один заказ."
          back={true}
          onClick={backHandler}
        >
          Вернуться назад
        </StateBlock>
      )}
    </section>
  );
};

export default Catalog;
