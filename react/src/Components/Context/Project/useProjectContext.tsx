import { useEffect, useState } from "react";
import type { Project } from "../../../shared/props/type";
import projectsApi from "../../../shared/api/project";
import { API_MODE, INTERVAL_TIME } from "../../Utils/Settings";

const useProjectContext = () => {
  const [errorAPI, setErrorAPI] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>(() => {
    // загрузка проектов из LS
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });

  const createProject = (
    title: string,
    desc: string,
    colorCode: string,
    colorCodeDark?: string,
    preview?: string,
  ) => {
    const newProject = {
      id: crypto.randomUUID(),
      title,
      desc,
      colorCode,
      colorCodeDark,
      createdAt: Date.now(),
      preview,
    };
    setProjects((prev) => {
      const updated = [...prev, newProject];
      localStorage.setItem("projects", JSON.stringify(updated));
      return updated;
    });

    return newProject.id;
  };

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
