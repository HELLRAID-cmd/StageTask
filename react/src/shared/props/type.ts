export type CardProps = {
  project?: Project;
  task?: Task;
};

export type Project = {
  id: string;
  title: string;
  desc: string;
  colorCode: string;
  createdAt: number;
  preview?: string | null;
  colorCodeDark?: string;
};

export type DeleteProps = {
  open: boolean;
  project: Project;
  onConfirm: () => void;
  onCancel: () => void;
};

export type ProjectContextType = {
  projects: Project[];
  createProject: (data: Omit<Project, "id">) => void;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  isProjectsEmpty: boolean;
};

export type Task = {
  id: string;
  title: string;
  status: string;
  projectId: string;
  createdAt: number;
  history: TaskHistory[];
  dueData?: string;
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
  createTask: (
    title: string,
    projectId: string,
    createdAt: number,
    history: [],
    dueData?: string,
  ) => void;
  editTaskId: string | null;
  setEditTaskId: React.Dispatch<React.SetStateAction<string | null>>;
  updateTaskTitle: (id: string, newTitle: string) => void;
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

export type TaskHistory = {
  id: string;
  type: "created" | "moved" | "renamed" | "deadline";
  date: number;
  dueData?: string;
  from?: string;
  to?: string;
  oldTitle?: string;
  newTitle?: string;
};
