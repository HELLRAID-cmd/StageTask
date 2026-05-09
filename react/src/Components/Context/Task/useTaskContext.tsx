import { useCallback, useEffect, useState } from "react";
import type { Task, TaskHistory } from "../../../shared/props/type";
import tasksApi from "../../../shared/api/task";
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

  const now = Date.now();
  const currentDate = new Date();

  const getTask = (id: string) => {
    return tasks.find((t) => t.id === id);
  }

  // Функция по созданию задачи
  const createTask = useCallback(
    async (data: Omit<Task, "id">) => {
      if (!activeProjectId) return null;

      const addedTask = await tasksApi.addTask(data);
      setTasks((prev) => [...prev, addedTask]);
    },
    [activeProjectId],
  );

  // Функция по удалению задачи
  const deleteTask = useCallback(async (taskId: string) => {
    tasksApi.deleteTask(taskId).then(() => {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    });
  }, []);

  const saveHistoryTask = useCallback(
    (taskId: string, history: Omit<TaskHistory, "id">) => {
      tasksApi.historyTask(taskId, history).then(() => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  history: [
                    ...task.history,
                    { ...history, id: crypto.randomUUID() },
                  ],
                }
              : task,
          ),
        );
      });
    },
    [],
  );

  // функция по изменению текста задачи
  const updateTaskTitle = useCallback((taskId: string, newTitle: string) => {
    tasksApi.editNameTask(taskId, newTitle).then(() => {
      setTasks((prev) => {
        const update = prev.map((task) =>
          task.id === taskId ? { ...task, title: newTitle } : task,
        );

        return update;
      });
    });
  }, []);

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
    deleteTask,
    saveHistoryTask,
    now,
    currentDate,
    getTask
  };
};

export default useTaskContext;
