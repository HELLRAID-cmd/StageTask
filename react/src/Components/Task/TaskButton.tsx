import { useDraggable } from "@dnd-kit/core";
import { useTasks } from "../Context/ContextTask";
import { useEffect } from "react";

const TaskButton = ({
  id,
  title,
  status,
  onDrop,
}: {
  id: string;
  title: string;
  status: string;
  onDrop?: (droppableId?: string) => void;
}) => {
  const { activeId, tasks } = useTasks();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: activeId ? 0.5 : 1,
  };

  const statusColors: Record<string, string> = {
    progress: "#ffd966",
    planned: "#6fa8dc",
    stopped: "#e06666",
    completed: "#93c47d",
  };

  useEffect(() => {
    if (tasks) {
      console.log(tasks);
    }
  }, [tasks]);

  return (
    <>
      <button
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="btn btn-primary w-100 text-start"
        style={{ ...style, backgroundColor: statusColors[status] }}
        onPointerUp={() => onDrop?.()}
      >
        {title}
      </button>
    </>
  );
};

export default TaskButton;
