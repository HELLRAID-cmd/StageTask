import { createContext, useState, type ReactNode } from "react";

export type ContextType = {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  copy: boolean;
  setCopy: React.Dispatch<React.SetStateAction<boolean>>;
  urlHistory: string[];
  setUrlHistory: React.Dispatch<React.SetStateAction<string[]>>;
};

export const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [url, setUrl] = useState("");
  const [copy, setCopy] = useState(false);
  const [urlHistory, setUrlHistory] = useState<string[]>([]);

  const contextValue: ContextType = {
    url,
    setUrl,
    copy,
    setCopy,
    urlHistory,
    setUrlHistory,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
