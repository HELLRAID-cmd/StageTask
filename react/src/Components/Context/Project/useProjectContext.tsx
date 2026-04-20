import { useCallback, useEffect, useState } from "react";
import type { Project } from "../../../shared/props/type";
import projectsApi from "../../../shared/api/project";
import { API_MODE, INTERVAL_TIME } from "../../Utils/Settings";

const useProjectContext = () => {
  const [errorAPI, setErrorAPI] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  const createProject = useCallback(async (data: Omit<Project, "id">) => {
    const addedProject = await projectsApi.add(data);
    setProjects((prev) => [...prev, addedProject]);
  }, []);

  useEffect(() => {
    // Вот так выглядит получение данных через GET
    const checkServer = async () => {
      try {
        const data = await projectsApi.getProject();
        setProjects(data);
        setErrorAPI(null);
      } catch {
        setErrorAPI("Ошибка сервера");
      } finally {
        setLoading(false);
      }
    };

    checkServer();

    if (API_MODE) {
      const interval = setInterval(checkServer, INTERVAL_TIME);

      return () => clearInterval(interval);
    }
  }, []);

  const isProjectsEmpty = !projects.length;

  return {
    projects,
    createProject,
    setProjects,
    isProjectsEmpty,
    errorAPI,
    setErrorAPI,
    loading,
    setLoading,
  };
};

export default useProjectContext;
