import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ButtonData = {
  id: string;
  title: string;
};

const DraggableButton = ({ id, title }: ButtonData) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="btn btn-primary"
    >
      {title}
    </button>
  );
};

export default DraggableButton;
