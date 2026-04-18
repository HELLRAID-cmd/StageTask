import { ProjectProvider } from "./Project/ProjectProvider";
import { TaskProvider } from "./Task/TaskProvider";

const providersArr = [ProjectProvider, TaskProvider];

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return providersArr.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children,
  );
};
