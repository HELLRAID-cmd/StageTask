import { createContext, useState, useContext, type ReactNode } from "react";

export type UrlContextType = {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
};

export const UrlContext = createContext<UrlContextType | undefined>(undefined);

export const UrlProvider = ({ children }: { children: ReactNode }) => {
  const [url, setUrl] = useState("");

  return (
    <UrlContext.Provider value={{ url, setUrl }}>
      {children}
    </UrlContext.Provider>
  );
};
