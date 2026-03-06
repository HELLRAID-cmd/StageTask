import { createContext, useContext, useState, type ReactNode } from "react";
import type { Task, TaskContextType } from "../Utils/type";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // загрузка задач из LS
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const createTask = (title: string, projectId: string) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      status: "planned",
      projectId
    };
    setTasks((prev) => {
      const updated = [...prev, newTask];
      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    })
  }

  const [activeId, setActiveId] = useState<string | null>(null);
  const [buttonCreate, setButtonCreate] = useState<string[]>([]);
  const [grabTask, setGrabTask] = useState<boolean>(false);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        activeId,
        setActiveId,
        buttonCreate,
        setButtonCreate,
        grabTask,
        setGrabTask,
        createTask
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
