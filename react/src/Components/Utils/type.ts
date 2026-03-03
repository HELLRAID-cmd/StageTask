export type CardProps = {
  project: Project;
};

export type Project = {
  id: string;
  title: string;
  desc: string;
  colorCode: string;
  createdAt: number;
};

export type DeleteProps = {
  open: boolean;
  project: Project;
  onConfirm: () => void;
  onCancel: () => void;
};

export type ProjectContextType = {
  projects: Project[];
  createProject: (title: string, desc: string, colorCode: string) => void;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
};

export type TaskContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  activeId: string | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
  buttonCreate: string[];
  setButtonCreate: React.Dispatch<React.SetStateAction<string[]>>;
  grabTask: boolean;
  setGrabTask: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Task = {
  id: string;
  title: string;
  status: string;
  projectId: string;
};

export type ButtonType = {
  id: string;
  title: string;
};

export type ModalWindowProps = {
  open: boolean;
  onClose: () => void;
};

export type TaskStatusType = {
  id: string;
  title: string;
  status: "planned" | "progress" | "stopped" | "completed";
  projectId: string;
};
