import { Navigate } from "react-router-dom";
import { useProject } from "../../Context/Project/ProjectContext";
import TaskColumn from "../Tasks/TaskColumn";
import ButtonCreateTask from "../../Drag/ButtonCreateTask";
import type { TaskColumnType } from "../../../shared/props/type";

function TaskColumns({ id, title }: TaskColumnType) {
  // const { id } = useParams();
  const { projects } = useProject();

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/notFound" />;
  }

  return (
    <li className="project-item rounded-3 p-2" id={`planned-${project.id}`}>
      <div className="project-item__top">
        <p className="project-item__title mb-4">{title}</p>
      </div>
      <TaskColumn projectId={project.id} status="planned" />
      <ButtonCreateTask projectId={project.id} />
    </li>
  );
}

export default TaskColumns;
