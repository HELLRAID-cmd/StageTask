import { useDroppable } from "@dnd-kit/core";
import { useTasks } from "../../Context/ContextTask";
import TaskButton from "../TaskButtons/TaskButton";

const TaskColumn = ({
  projectId,
  status,
}: {
  projectId: string;
  status: string;
}) => {
  const { tasks, editTaskId, setEditTaskId } = useTasks();
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
          <li className={`task-item task-item__${status}`} key={task.id}>
            <div className="task-item__btns">
              <TaskButton
                task={task}
                editTaskId={editTaskId}
                setEditTaskId={setEditTaskId}
              />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default TaskColumn;
