import { createContext, useContext, useState, type ReactNode } from "react";
import type { ButtonType } from "../Utils/type";

type ButtonContextType = {
  buttons: ButtonType[];
  setButtons: React.Dispatch<React.SetStateAction<ButtonType[]>>;
};

const ButtonContext = createContext<ButtonContextType | undefined>(undefined);

export const ButtonProvider = ({ children }: { children: ReactNode }) => {
  const [buttons, setButtons] = useState<ButtonType[]>([]);

  return (
    <ButtonContext.Provider value={{ buttons, setButtons }}>
      {children}
    </ButtonContext.Provider>
  );
};

export const useButtons = () => {
  const context = useContext(ButtonContext);
  if (!context)
    throw new Error("useButtons must be used within ButtonProvider");
  return context;
};