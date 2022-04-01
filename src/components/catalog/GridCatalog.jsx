import { useContext } from "react";
import ContentLoader from "react-content-loader";
import SneakersCard from "./SneakersCard";
import { SneakersContext } from "../../store/sneakers-context";

import classes from "./GridCatalog.module.scss";
import styles from "./SneakersCard.module.scss";

const GridCatalog = (props) => {
  const ctx = useContext(SneakersContext);
  console.log(props);
  return (
    <div className={classes.catalog}>
      {!ctx.isLoading &&
        props.catalog.map((sneakers) => (
          <SneakersCard sneakers={sneakers} key={sneakers.sId} />
        ))}
      {ctx.isLoading &&
        [1, 2, 3, 4].map((item) => (
          <div className={styles.card} key={item}>
            <ContentLoader
              speed={2}
              width="110%"
              height={260}
              viewBox="0 0 210 260"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="0" ry="0" width="150" height="91" />
              <rect x="0" y="98" rx="0" ry="0" width="150" height="15" />
              <rect x="0" y="120" rx="0" ry="0" width="93" height="15" />
              <rect x="0" y="152" rx="0" ry="0" width="80" height="24" />
              <rect x="119" y="144" rx="0" ry="0" width="32" height="32" />
            </ContentLoader>
          </div>
        ))}
    </div>
  );
};

export default GridCatalog;
