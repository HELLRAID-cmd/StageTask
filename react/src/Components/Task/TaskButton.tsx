import { useDraggable, DragOverlay } from "@dnd-kit/core";
import { useState } from "react";

const TaskButton = ({ id, title }: { id: string; title: string }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <>
      <button
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        onPointerDown={() => setActiveId(id)}
        onPointerUp={() => setActiveId(null)}
        className="btn btn-primary w-100 text-start"
      >
        {title}
      </button>

      <DragOverlay>
        {activeId && (
          <button className="btn btn-danger opacity-75">{title}</button>
        )}
      </DragOverlay>
    </>
  );
};

export default TaskButton