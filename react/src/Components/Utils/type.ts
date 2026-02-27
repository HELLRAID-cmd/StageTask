export type CardProps = {
  project: Project
}

export type Project = {
  id: string;
  title: string;
  desc: string;
  colorCode: string;
  createdAt: number;
};

export type DeleteProps = {
  id: string;
}

export type ProjectContextType = {
  projects: Project[];
  createProject: (title: string, desc: string, colorCode: string) => void;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
};