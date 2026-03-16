import { createContext, useContext, useState, type ReactNode } from "react";
import type { Task, TaskContextType, TaskHistory } from "../Utils/type";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // загрузка задач из LS
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Функция по созданию задачи
  const createTask = (title: string, projectId: string, createdAt: number) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status: "planned",
      projectId,
      createdAt,
      history: [
        {
          id: crypto.randomUUID(),
          type: "created",
          date: createdAt,
        },
      ],
    };
    setTasks((prev) => {
      const updated = [...prev, newTask];
      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    });
  };

  // функция по изменению текста задачи
  const updateTaskTitle = (id: string, newTitle: string) => {
    setTasks((prev) => {
      const updated = prev.map((task) => {
        if (task.id !== id) return task;

        const historyItem: TaskHistory = {
          id: crypto.randomUUID(),
          type: "renamed",
          date: Date.now(),
          oldTitle: task.title,
          newTitle,
        };

        return {
          ...task,
          title: newTitle,
          history: [...task.history, historyItem],
        };
      });

      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    });
  };

  const [activeId, setActiveId] = useState<string | null>(null);
  const [buttonCreate, setButtonCreate] = useState<string[]>([]);
  const [grabTask, setGrabTask] = useState<boolean>(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

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
        createTask,
        editTaskId,
        setEditTaskId,
        updateTaskTitle,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};
