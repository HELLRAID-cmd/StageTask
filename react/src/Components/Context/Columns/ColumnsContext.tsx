import { createContext, useContext } from "react";
import type useColumnsContext from "./useColumnsContext";

export type ColumnsContextType = ReturnType<typeof useColumnsContext>;

export const ColumnsContext = createContext<ColumnsContextType | null>(null);

export const useColumns = () => {
  const ctx = useContext(ColumnsContext);

  if (!ctx) {
    throw new Error("ColumnsProvider is missing");
  }

  return ctx;
};
