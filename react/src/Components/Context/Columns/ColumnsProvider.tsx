import { ColumnsContext } from "./ColumnsContext";
import useColumnsContext from "./useColumnsContext";

export const ColumnsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useColumnsContext();

  return (
    <ColumnsContext.Provider value={value}>{children}</ColumnsContext.Provider>
  );
};
