import { Navigate } from "react-router-dom";
import { useProject } from "../../Context/Project/ProjectContext";
import TaskColumn from "../Tasks/TaskColumn";
import { useColumns } from "../../Context/Columns/ColumnsContext";
import ButtonCreateTask from "./ButtonCreateTask";

function TaskColumns({ projectId }: { projectId: string }) {
  const { getProject } = useProject();
  const { columns, isColumnsEmpty } = useColumns();

  const project = getProject(projectId);

  if (!project) {
    return <Navigate to="/notFound" />;
  }

  return (
    <>
      {isColumnsEmpty ? (
        <h1 className="project-list__text text-light heading-primary">
          Похоже у вас еще нет колонок, поскорее создайте их!
        </h1>
      ) : (
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
                <TaskColumn columnId={column.id} projectId={projectId} />
                <ButtonCreateTask columnId={column.id} projectId={projectId} />
              </li>
            ))}
        </>
      )}
    </>
  );
}

export default TaskColumns;
