import { useDroppable } from "@dnd-kit/core";
import { useTasks } from "../../Context/ContextTask";
import TaskButton from "../TaskButton";
import TaskDelete from "./TaskDelete";

const TaskColumn = ({
  projectId,
  status,
}: {
  projectId: string;
  status: string;
}) => {
  const { tasks } = useTasks();
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <ul className={`task task-column task-${status}`} ref={setNodeRef}>
      {tasks
        .filter(
          (task) => task.projectId === projectId && task.status === status,
        )
        .map((task) => (
          <li className={`task-item task-item__${status}`} key={task.id}>
            <div className="task-item__btns">
              <TaskButton
                id={task.id}
                title={task.title}
                status={task.status}
              />
              <TaskDelete task={task} />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default TaskColumn;
