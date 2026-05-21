import { Navigate } from "react-router-dom";
import { useProject } from "../../Context/Project/ProjectContext";
import TaskColumn from "../Tasks/TaskColumn";
import ButtonCreateTask from "../../Drag/ButtonCreateTask";
import { useColumns } from "../../Context/Columns/ColumnsContext";

function TaskColumns({ projectId }: { projectId: string }) {
  const { getProject } = useProject();
  const { columns } = useColumns();

  const project = getProject(projectId);

  if (!project) {
    return <Navigate to="/notFound" />;
  }

  return (
    <>
      {columns
        .filter((column) => column.projectId === projectId)
        .map((column) => (
          <li
            className="project-item rounded-3 p-2"
            id={`planned-${column.id}`}
            key={column.id}
          >
            <div className="project-item__top">
              <p className="project-item__title mb-4">{column.title}</p>
            </div>
            <TaskColumn projectId={column.id} status="planned" />
            <ButtonCreateTask projectId={column.id} />
          </li>
        ))}
    </>
  );
}

export default TaskColumns;
