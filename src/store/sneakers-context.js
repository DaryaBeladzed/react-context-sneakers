import React, { useCallback, useState } from "react";
import { CartContextProvider } from "./cart-context";
import useHttp from "../hooks/use-http";

export const SneakersContext = React.createContext({
  isLoading: false,
  setFilter: () => {},
  sneakers: [],
  favourites: [],
  addFavourite: () => {},
  deleteFavourite: () => {},
  getFavourites: (isFavouritesPage) => {},
  getOrders: () => {},
  orders: [],
});

const SneakersContextProvider = (props) => {
  const [sneakers, setSneakers] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [orders, setOrders] = useState([]);
  const { isLoading, sendRequest } = useHttp();

  const setFilter = useCallback(
    async (filter) => {
      sendRequest(
        {
          method: "get",
          url: `/sneakers?info=${filter}`,
        },
        true,
        setSneakers
      );
    },
    [sendRequest]
  );

  const getFavourites = useCallback(
    async (isFavouritesPage) => {
      sendRequest(
        {
          method: "get",
          url: `/favourites`,
        },
        isFavouritesPage,
        setFavourites
      );
    },
    [sendRequest]
  );

  const addFavourite = useCallback(
    async (item) => {
      sendRequest(
        {
          method: "post",
          url: `/favourites`,
          data: item,
        },
        false,
        (data) => {
          setFavourites((prevState) => [...prevState, data]);
        }
      );
    },
    [sendRequest]
  );

  const deleteFavourite = useCallback(
    async (sId) => {
      const id = favourites.find((elem) => elem.sId === sId).id;
      sendRequest(
        {
          method: "delete",
          url: `/favourites/${id}`,
        },
        false,
        (data) => {
          setFavourites((prevState) =>
            prevState.filter((item) => item.sId !== data.sId)
          );
        }
      );
    },
    [sendRequest, favourites]
  );

  const getOrders = useCallback(async () => {
    sendRequest(
      {
        method: "get",
        url: `/orders`,
      },
      true,
      (data) => {
        console.log(data);
        const items = data.reduce(
          (prev, current) => [...prev, ...current.items],
          []
        );
        const newItems = items.filter((item, ind) => {
          return items.findIndex((elem) => elem.sId === item.sId) === ind;
        });
        setOrders(newItems);
      }
    );
  }, [sendRequest]);

  return (
    <SneakersContext.Provider
      value={{
        isLoading,
        setFilter,
        sneakers,
        favourites,
        getFavourites,
        addFavourite,
        deleteFavourite,
        orders,
        getOrders,
      }}
    >
      <CartContextProvider>{props.children}</CartContextProvider>
    </SneakersContext.Provider>
  );
};

export default SneakersContextProvider;
