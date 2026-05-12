import { HEADERS, URL_TASK } from "../../Components/Utils/Settings";
import type { Task, TaskHistory } from "../props/type";

const tasksApi = {
  getTaskByProjectId: async (projectId: string) => {
    const response = await fetch(`${URL_TASK}?projectId=${projectId}`);

    if (!response.ok) {
      throw new Error(`getTaskByProjectId error: ${response.status}`);
    }

    return await response.json();
  },

  historyTask: async (taskId: string, history: Omit<TaskHistory, "id">) => {
    const res = await fetch(`${URL_TASK}/${taskId}`);
    const task = await res.json();

    const updatedHistory = [
      ...task.history,
      { ...history, id: crypto.randomUUID() },
    ];

    const response = await fetch(`${URL_TASK}/${taskId}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({
        history: updatedHistory,
        status: history.to,
      }),
    });

    if (!response.ok) {
      throw new Error(`historyTask error: ${response.status}`);
    }

    return response.json();
  },

  addTask: async (task: Omit<Task, "id">) => {
    const response = await fetch(URL_TASK, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`addTask error: ${response.status}`);
    }

    return await response.json();
  },

  deleteTask: async (taskId: string) => {
    const response = await fetch(`${URL_TASK}/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`deleteTask error: ${response.status}`);
    }

    return await response.json();
  },

  editNameTask: async (id: string, title: string) => {
    const response = await fetch(`${URL_TASK}/${id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error(`editNameTask error: ${response.status}`);
    }

    return await response.json();
  },

  editDateTask: async (id: string, date: string) => {
    const response = await fetch(`${URL_TASK}/${id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({ date }),
    });

    if (!response.ok) {
      throw new Error(`editDateTask error: ${response.status}`);
    }

    return await response.json();
  },
};

export default tasksApi;
