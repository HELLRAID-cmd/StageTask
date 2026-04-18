import { useState } from "react";
import type { Project } from "../../../shared/props/type";

const useProjectContext = () => {
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

  const isProjectsEmpty = !projects.length;

  return {
    projects,
    createProject,
    setProjects,
    isProjectsEmpty,
  };
};

export default useProjectContext;
