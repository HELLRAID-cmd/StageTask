import { useDroppable } from "@dnd-kit/core";
import TaskButton from "../TaskButtons/TaskButton";
import { useTask } from "../../Context/Task/TaskContext";

const TaskColumn = ({
  projectId,
  status,
}: {
  projectId: string;
  status: string;
}) => {
  const { tasks, editTaskId } = useTask();
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <ul className={`task-column task-${status}`} ref={setNodeRef}>
      {tasks
        .filter(
          (task) => task.projectId === projectId && task.status === status,
        )
        .map((task) => (
          <li
            className={`task-column__item task-column__item-${status}`}
            key={task.id}
          >
            <div className="task-item__btns">
              <TaskButton task={task} editTaskId={editTaskId} />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default TaskColumn;
