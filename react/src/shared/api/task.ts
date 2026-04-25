import { HEADERS, URL_TASK } from "../../Components/Utils/Settings";
import type { Task, TaskHistory } from "../props/type";

const tasksApi = {
  getTaskByProjectId: (projectId: string) => {
    return fetch(`${URL_TASK}?projectId=${projectId}`).then((response) =>
      response.json(),
    );
  },

  historyTask: async (taskId: string, history: Omit<TaskHistory, "id">) => {
    const res = await fetch(`${URL_TASK}/${taskId}`);
    const task = await res.json();

    const updatedHistory = [
      ...task.history,
      { ...history, id: crypto.randomUUID() },
    ];

    return fetch(`${URL_TASK}/${taskId}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({
        history: updatedHistory,
        status: history.to
      }),
    });
  },

  addTask: (task: Omit<Task, "id">) => {
    return fetch(URL_TASK, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(task),
    }).then((response) => response.json());
  },

  deleteTask: (taskId: string) => {
    return fetch(`${URL_TASK}/${taskId}`, {
      method: "DELETE",
    });
  },

  editNameTask: (id: string, title: string) => {
    return fetch(`${URL_TASK}/${id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({ title }),
    });
  },
};

export default tasksApi;
