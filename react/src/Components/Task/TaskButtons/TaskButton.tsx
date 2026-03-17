import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../../Utils/type";
import { useTasks } from "../../Context/ContextTask";
import TaskHistoryBtn from "./TaskHistoryBtn";
import TaskDelete from "./TaskDelete";
import TaskEdit from "./TaskEdit";

const TaskButton = ({
  task,
  editTaskId,
}: {
  task: Task;
  editTaskId: string | null;
}) => {
  const { grabTask } = useTasks();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  if (!task) return null;

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div className="task-item">
      <div
        ref={setNodeRef}
        className="task-item__btns-btn btn text-light w-100 text-start"
        style={{ ...style }}
      >
        <span
          {...listeners}
          {...attributes}
          style={{ cursor: "grab", marginRight: 8, color: "#000" }}
        >
          ☰
        </span>
        {editTaskId === task.id ? (
          <TaskEdit input={task.title} taskId={task.id} />
        ) : (
          <p className="task-item__btns-text">{task.title}</p>
        )}
      </div>
      <div className="task-item__btns-inner">
        {!grabTask && (
          <>
            <TaskEdit input={task.title} taskId={task.id} />
            <TaskHistoryBtn taskId={task.id} />
            <TaskDelete task={task} />
          </>
        )}
      </div>
    </div>
  );
};

export default TaskButton;
