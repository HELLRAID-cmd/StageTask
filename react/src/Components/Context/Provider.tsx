import { ProjectProvider } from "./Context";
import { ButtonProvider } from "./ContextButton";
import { TaskProvider } from "./ContextTask";

const providersArr = [
  ProjectProvider,
  TaskProvider,
  ButtonProvider,
];

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return providersArr.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};