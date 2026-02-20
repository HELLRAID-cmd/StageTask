import { useContext } from "react";
import { UrlContext } from "./UrlContext";

export const useUrl = () => {
  const context = useContext(UrlContext);
  if (!context) throw new Error("useUrl must be used within a UrlProvider");
  return context;
};