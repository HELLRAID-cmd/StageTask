import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../../Utils/type";
import { useTasks } from "../../Context/ContextTask";
import TaskChange from "../Tasks/TaskChange";
import TaskHistoryBtn from "./TaskHistoryBtn";
import TaskDelete from "./TaskDelete";

const TaskButton = ({
  task,
  editTaskId,
  setEditTaskId,
}: {
  task: Task;
  editTaskId: string | null;
  setEditTaskId: React.Dispatch<React.SetStateAction<string | null>>;
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

  const statusColors: Record<string, string> = {
    planned: "#474747",
    progress: "#4338dd",
    stopped: "#9c0d0d",
    completed: "#068633",
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (task.status === "completed") return;

    setEditTaskId((prev) => (prev === task.id ? null : task.id));
  };

  return (
    <div className="task-item">
      <div
        ref={setNodeRef}
        className="task-item__btns-btn btn text-light w-100 text-start"
        style={{ ...style, backgroundColor: statusColors[task.status] }}
        onDoubleClick={handleDoubleClick}
      >
        <span
          {...listeners}
          {...attributes}
          style={{ cursor: "grab", marginRight: 8 }}
        >
          ☰
        </span>
        {editTaskId === task.id ? (
          <TaskChange input={task.title} taskId={task.id} />
        ) : (
          task.title
        )}
      </div>
      <div className="task-item__btns-inner">
        <TaskHistoryBtn taskId={task.id} />
        {!grabTask && <TaskDelete task={task} />}
      </div>
    </div>
  );
};

export default TaskButton;
