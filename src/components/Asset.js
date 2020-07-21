import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchAsset } from "../store/asset";

import styles from "./Asset.css";

function Asset() {
  const { contractAddress, tokenId } = useParams();
  const dispatch = useDispatch();

  const asset = useSelector(
    state =>
      state.asset[contractAddress] && state.asset[contractAddress][tokenId]
  );

  useEffect(() => {
    if (!asset) {
      dispatch(fetchAsset(contractAddress, tokenId));
    }
  }, [asset]);

  if (!asset) return null;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.collectionName}>{asset.collection.name}</h1>
      <img className={styles.image} src={asset.image_url} />
      <h2 className={styles.assetName}>{asset.name}</h2>
      <p className={styles.description}>{asset.description}</p>
      <a
        className={styles.permalink}
        target="_blank"
        rel="noopener noreferrer"
        href={asset.permalink}
      >
        Permalink
      </a>
    </div>
  );
}

export default Asset;
