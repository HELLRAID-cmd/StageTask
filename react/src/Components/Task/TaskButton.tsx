import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../Utils/type";
import TaskDelete from "./Tasks/TaskDelete";
import { useTasks } from "../Context/ContextTask";

const TaskButton = ({ task }: { task: Task }) => {
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

  return (
    <div className="task-item">
      <button
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="task-item__btns-btn btn text-light w-100 text-start"
        style={{ ...style, backgroundColor: statusColors[task.status] }}
      >
        {task.title}
      </button>
      {!grabTask && <TaskDelete task={task} />}
    </div>
  );
};

export default TaskButton;
