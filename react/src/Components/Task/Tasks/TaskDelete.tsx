import { useTasks } from "../../Context/ContextTask";
import type { Task } from "../../Utils/type";
import { DeleteOutlined } from "@ant-design/icons";

const TaskDelete: React.FC<{ task: Task }> = ({ task }) => {
  const { setTasks } = useTasks();

  const handleDelete = () => {
    setTasks((prev) => {
      const updated = prev.filter((p) => p.id !== task.id);
      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <button className="task-item__button" type="button" onClick={handleDelete}>
      <DeleteOutlined />
    </button>
  );
};

export default TaskDelete;
