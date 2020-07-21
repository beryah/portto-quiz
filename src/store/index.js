import { combineEpics, createEpicMiddleware } from "redux-observable";
import { applyMiddleware, combineReducers, createStore } from "redux";

import asset, { fetchAssetEpic } from "./asset";
import assets, { fetchAssetsEpic } from "./assets";

const rootEpic = combineEpics(fetchAssetEpic, fetchAssetsEpic);
const rootReducer = combineReducers({ asset, assets });

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
  epicMiddleware.run(rootEpic);
  return store;
}
