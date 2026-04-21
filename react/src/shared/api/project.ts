import { HEADERS, URL_PROJECT } from "../../Components/Utils/Settings";
import type { Project } from "../props/type";

const projectsApi = {
  getProject: () => {
    return fetch(URL_PROJECT).then((response) => response.json());
  },

  add: (project: Omit<Project, "id">) => {
    return fetch(URL_PROJECT, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(project),
    }).then((response) => response.json());
  },

  delete: (id: string) => {
    return fetch(`${URL_PROJECT}/${id}`, {
      method: "DELETE",
    });
  },

  update: (id: string, data: Partial<Project>) => {
    return fetch(`${URL_PROJECT}/${id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify(data),
    }).then((res) => res.json());
  },
};

export default projectsApi;
