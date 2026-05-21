import { ColumnsProvider } from "./Columns/ColumnsProvider";
import { ProjectProvider } from "./Project/ProjectProvider";
import { TaskProvider } from "./Task/TaskProvider";

const providersArr = [ProjectProvider, ColumnsProvider, TaskProvider];

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return providersArr.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children,
  );
};
