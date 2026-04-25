import { HEADERS, URL_PROJECT } from "../../Components/Utils/Settings";
import type { Project } from "../props/type";

const projectsApi = {
  getProject: async () => {
    const response = await fetch(URL_PROJECT);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
  },

  add: async (project: Omit<Project, "id">) => {
    const response = await fetch(URL_PROJECT, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error(`ADD error: ${response.status}`);
    }

    return await response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${URL_PROJECT}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`DELETE error: ${response.status}`);
    }

    return await response.json();
  },

  update: async (id: string, data: Partial<Project>) => {
    const response = await fetch(`${URL_PROJECT}/${id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`UPDATE error: ${response.status}`);
    }
    
    return await response.json();
  },
};

export default projectsApi;
