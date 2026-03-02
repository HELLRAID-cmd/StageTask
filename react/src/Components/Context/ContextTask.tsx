import { createContext, useContext, useState, type ReactNode } from "react";
import type { Task, TaskContextType } from "../Utils/type";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // загрузка задач из LS
    const saved = localStorage.getItem("Tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const [buttonCreate, setButtonCreate] = useState<string[]>([]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        activeId,
        setActiveId,
        buttonCreate,
        setButtonCreate,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTasks must be used within TaskProvider");
  return context;
};
