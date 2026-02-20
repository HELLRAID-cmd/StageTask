import { createContext, useState, type ReactNode } from "react";

export type UrlContextType = {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  copy: boolean;
  setCopy: React.Dispatch<React.SetStateAction<boolean>>;
  urlHistory: string[];
  setUrlHistory: React.Dispatch<React.SetStateAction<string[]>>;
};

export const UrlContext = createContext<UrlContextType | undefined>(undefined);

export const UrlProvider = ({ children }: { children: ReactNode }) => {
  const [url, setUrl] = useState("");
  const [copy, setCopy] = useState(false);
  const [urlHistory, setUrlHistory] = useState<string[]>([]);

  return (
    <UrlContext.Provider value={{ url, setUrl, copy, setCopy, urlHistory, setUrlHistory }}>
      {children}
    </UrlContext.Provider>
  );
};
