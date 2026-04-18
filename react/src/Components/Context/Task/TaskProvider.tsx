import { TaskContext } from "./TaskContext";
import useTaskContext from "./useTaskContext";

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useTaskContext();

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
