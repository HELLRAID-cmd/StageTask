import { HEADERS, URL_TASK } from "../../Components/Utils/Settings";
import type { Task } from "../props/type";

const tasksApi = {
  getTaskByProjectId: (projectId: string) => {
    return fetch(`${URL_TASK}?projectId=${projectId}`).then((response) =>
      response.json(),
    );
  },

  addTask: (task: Omit<Task, "id">) => {
    return fetch(URL_TASK, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(task),
    }).then((response) => response.json());
  },
};

export default tasksApi;
