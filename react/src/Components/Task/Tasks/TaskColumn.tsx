import { useDroppable } from "@dnd-kit/core";
import TaskButton from "../TaskButtons/TaskButton";
import { useTask } from "../../Context/Task/TaskContext";

const TaskColumn = ({
  columnId,
  projectId,
}: {
  columnId: string;
  projectId: string;
}) => {
  const { tasks, editTaskId } = useTask();
  const { setNodeRef } = useDroppable({
    id: columnId,
  });

  return (
    <ul className="task-column" ref={setNodeRef}>
      {tasks
        .filter(
          (task) => task.projectId === projectId && task.columnId === columnId,
        )
        .map((task) => (
          <li className="task-column__item" key={task.id}>
            <div className="task-item__btns">
              <TaskButton task={task} editTaskId={editTaskId} />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default TaskColumn;
