import { useDraggable } from "@dnd-kit/core";

const TaskButton = ({
  id,
  title,
  status,
}: {
  id: string;
  title: string;
  status: string;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  const statusColors: Record<string, string> = {
    progress: "#ffd966",
    planned: "#6fa8dc",
    stopped: "#e06666",
    completed: "#93c47d",
  };

  return (
    <>
      <button
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="btn btn-primary w-100 text-start"
        style={{ ...style, backgroundColor: statusColors[status] }}
      >
        {title}
      </button>
    </>
  );
};

export default TaskButton;
