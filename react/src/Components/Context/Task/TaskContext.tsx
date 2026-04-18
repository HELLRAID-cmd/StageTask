import { createContext, useContext } from "react";
import type useTaskContext from "./useTaskContext";

export type TaskContextType = ReturnType<typeof useTaskContext>;

export const TaskContext = createContext<TaskContextType | null>(null);

export const useTask = () => {
  const ctx = useContext(TaskContext);

  if (!ctx) {
    throw new Error("TaskContext is missing");
  }

  return ctx;
};
