import React, { createContext } from "react";
import Root from "../stores/root";

type Props = {
  children: React.ReactNode;
};

const rootStore = new Root();
export const RootContext = createContext(rootStore);

const StoreContext = ({ children }: Props) => {
  return (
    <RootContext.Provider value={rootStore}>{children}</RootContext.Provider>
  );
};

export default StoreContext;
