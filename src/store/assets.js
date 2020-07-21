import qs from "qs";
import { ajax } from "rxjs/ajax";
import { map, mapTo, mergeMap } from "rxjs/operators";
import { ofType } from "redux-observable";

// action creators
const fetchAssets = () => ({ type: "FETCH_ASSETS" });
const fetchAssetsFulfilled = payload => ({
  type: "FETCH_ASSETS_FULFILLED",
  payload
});

// epic
const fetchAssetsEpic = (action$, state$) =>
  action$.pipe(
    ofType("FETCH_ASSETS"),
    mergeMap(() =>
      ajax
        .getJSON(
          `https://api.opensea.io/api/v1/assets?${qs.stringify({
            format: "json",
            owner: "0x960DE9907A2e2f5363646d48D7FB675Cd2892e91",
            offset: state$.value.assets.length,
            limit: 20
          })}`
        )
        .pipe(map(({ assets }) => fetchAssetsFulfilled(assets)))
    )
  );

// reducer
const initialState = [];
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ASSETS_FULFILLED":
      return [...state, ...action.payload];

    default:
      return state;
  }
};

export default reducer;
export { fetchAssets, fetchAssetsEpic };
