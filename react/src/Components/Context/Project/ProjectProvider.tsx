import { ProjectContext } from "./ProjectContext";
import useProjectContext from "./useProjectContext";

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useProjectContext();

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
