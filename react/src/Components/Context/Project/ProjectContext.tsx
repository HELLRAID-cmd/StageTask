import { createContext, useContext } from "react";
import type useProjectContext from "./useProjectContext";

export type ProjectContextType = ReturnType<typeof useProjectContext>;

export const ProjectContext = createContext<ProjectContextType | null>(null);

export const useProject = () => {
  const ctx = useContext(ProjectContext);

  if (!ctx) {
    throw new Error("ProjectProvider is missing");
  }

  return ctx;
};
