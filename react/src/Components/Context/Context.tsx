import { createContext, useContext, useState, type ReactNode } from "react";
import type { Project, ProjectContextType } from "../Utils/type";

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    // загрузка проектов из LS
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });

  const createProject = (
    title: string,
    desc: string,
    colorCode: string,
    preview: string,
  ) => {
    const newProject = {
      id: crypto.randomUUID(),
      title,
      desc,
      colorCode,
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

  return (
    <ProjectContext.Provider
      value={{
        projects,
        createProject,
        setProjects,
        isProjectsEmpty,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context)
    throw new Error("useProjects must be used within ProjectProvider");
  return context;
};
