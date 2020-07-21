import React, { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { fetchAssets } from "../store/assets";

import styles from "./Assets.css";

function Assets() {
  const [pending, setPending] = useState(false);

  const dispatch = useDispatch();
  const assets = useSelector(state => state.assets);

  useEffect(() => {
    setPending(true);
    dispatch(fetchAssets());
  }, []);

  useEffect(() => {
    setPending(false);
  }, [assets]);

  useEffect(() => {
    const onScroll = debounce(e => {
      const isScrolledToBottom =
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight * 0.95;

      if (isScrolledToBottom && !pending) {
        setPending(true);
        dispatch(fetchAssets());
      }
    }, 200);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  const renderAsset = (
    { name, image_url, token_id, asset_contract: { address } },
    i
  ) => (
    <Link className={styles.asset} to={`/${address}/${token_id}`} key={i}>
      <div className={styles.imgWrapper}>
        <LazyLoadImage src={image_url} />
      </div>
      <h2>{name}</h2>
    </Link>
  );

  return (
    <>
      <h1 className={styles.title}>List</h1>
      <div className={styles.assets}>
        {assets
          .filter(x => x.name && x.image_url && x.token_id)
          .map(renderAsset)}
      </div>
    </>
  );
}

export default Assets;
