import React from "react";
import { RootStore } from "./rootStore";

export const rootStore = new RootStore();

const RootStoreContext = React.createContext(rootStore);

export function useStores(): RootStore {
  return React.useContext(RootStoreContext);
}