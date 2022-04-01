import React, { useContext, useEffect, useState } from "react";
import { SneakersContext } from "../../store/sneakers-context";
import classes from "./Search.module.scss";

const Search = () => {
  const [searchTyped, setSearchTyped] = useState("");
  const { setFilter } = useContext(SneakersContext);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilter(searchTyped);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTyped, setFilter]);

  return (
    <div className={classes.search}>
      <img src="./image/search.svg" alt="search" />
      <input
        type="text"
        placeholder="Поиск..."
        value={searchTyped}
        onChange={(event) => setSearchTyped(event.target.value)}
      />
    </div>
  );
};

export default React.memo(Search);
