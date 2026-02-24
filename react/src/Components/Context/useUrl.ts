import { useContext } from "react";
import { Context } from "./Context";

export const useUrl = () => {
  const context = useContext(Context);
  if (!context) throw new Error("useUrl must be used within a UrlProvider");
  return context;
};