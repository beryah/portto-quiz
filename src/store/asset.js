import qs from "qs";
import { ajax } from "rxjs/ajax";
import { catchError, map, mapTo, mergeMap } from "rxjs/operators";
import { ofType } from "redux-observable";

// action creators
const fetchAsset = (contractAddress, tokenId) => ({
  type: "FETCH_ASSET",
  payload: { contractAddress, tokenId }
});
const fetchAssetFulfilled = payload => ({
  type: "FETCH_ASSET_FULFILLED",
  payload
});

// epic
const fetchAssetEpic = (action$, state$) =>
  action$.pipe(
    ofType("FETCH_ASSET"),
    mergeMap(({ payload: { contractAddress, tokenId } }) =>
      ajax
        .getJSON(
          `https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}`
        )
        .pipe(
          map(asset =>
            fetchAssetFulfilled({ contractAddress, tokenId, asset })
          ),
          catchError(() => {
            window.location.replace("/404");
            return { type: "" };
          })
        )
    )
  );

// reducer
const initialState = [];
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ASSET_FULFILLED": {
      const { contractAddress, tokenId, asset } = action.payload;
      return {
        ...state,
        [contractAddress]: { ...state[contractAddress], [tokenId]: asset }
      };
    }

    default:
      return state;
  }
};

export default reducer;
export { fetchAsset, fetchAssetEpic };
