import { useCallback, useEffect, useState } from "react";
import type { Task, TaskHistory } from "../../../shared/props/type";
import tasksApi from "../../../shared/api/task";
import { API_MODE, INTERVAL_TIME } from "../../Utils/Settings";
import { useProject } from "../Project/ProjectContext";

const useTaskContext = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [buttonCreate, setButtonCreate] = useState<string[]>([]);
  const [grabTask, setGrabTask] = useState<boolean>(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [errorAPITask, setErrorAPITask] = useState<string | null>(null);
  const [loadingTask, setLoadingTask] = useState(true);

  const [tasks, setTasks] = useState<Task[]>([]);

  const { activeProjectId } = useProject();

  // Функция по созданию задачи
  const createTask = useCallback(
    async (data: Omit<Task, "id">) => {
      if (!activeProjectId) return null;

      const addedTask = await tasksApi.addTask(data);
      setTasks((prev) => [...prev, addedTask]);
    },
    [activeProjectId],
  );

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

  // Вот так выглядит получение данных через GET
  useEffect(() => {
    if (!activeProjectId) return;

    const checkServer = async () => {
      try {
        const data = await tasksApi.getTaskByProjectId(activeProjectId);
        setTasks(data);
        setErrorAPITask(null);
      } catch {
        setErrorAPITask("Ошибка сервера");
      } finally {
        setLoadingTask(false);
      }
    };

    checkServer();

    if (API_MODE) {
      const interval = setInterval(checkServer, INTERVAL_TIME);

      return () => clearInterval(interval);
    }
  }, [activeProjectId]);

  return {
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
    errorAPITask,
    setErrorAPITask,
    loadingTask,
    setLoadingTask,
  };
};

export default useTaskContext;
