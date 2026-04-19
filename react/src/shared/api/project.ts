import { URL_PROJECT } from "../../Components/Utils/Settings";

const projectsApi = {
  getProject: () => {
    return fetch(URL_PROJECT).then((response) => response.json());
  },
};

export default projectsApi;
