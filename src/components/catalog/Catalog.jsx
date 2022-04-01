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

  const isMainPage = location === `${process.env.PUBLIC_URL}/`;
  const isFavouritesPage = location === `${process.env.PUBLIC_URL}/favourites`;
  const isOrdersPage = location === `${process.env.PUBLIC_URL}/orders`;

  useEffect(() => {
    if (!isOrdersPage) getFavourites(isFavouritesPage);
    else getOrders();
  }, [getFavourites, isOrdersPage, getOrders, isFavouritesPage]);

  const backHandler = () => {
    nav(`${process.env.PUBLIC_URL}/`);
  };

  const isShowHeader =
    (isFavouritesPage && favourites.length !== 0) ||
    (isOrdersPage && orders.length !== 0) ||
    isMainPage;

  return (
    <section className={classes.catalog}>
      {isShowHeader && (
        <div className={classes.catalog__header}>
          <div>
            {!isMainPage && (
              <button type="button" onClick={backHandler}>
                <img src="./image/back_gr.svg" alt="back" />
              </button>
            )}
            <h2>{props.title}</h2>
          </div>
          {isMainPage && <Search />}
        </div>
      )}
      {isMainPage && <GridCatalog catalog={sneakers} />}
      {isFavouritesPage && favourites.length !== 0 && (
        <GridCatalog catalog={favourites} />
      )}
      {isFavouritesPage && favourites.length === 0 && (
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
      {isOrdersPage && orders.length !== 0 && <GridCatalog catalog={orders} />}
      {isOrdersPage && orders.length === 0 && (
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
