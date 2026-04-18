import { useTask } from "../../Context/Task/TaskContext";
import type { Task } from "../../../shared/props/type";
import { DeleteOutlined } from "@ant-design/icons";

const TaskDelete: React.FC<{ task: Task }> = ({ task }) => {
  const { setTasks } = useTask();

  const handleDelete = () => {
    setTasks((prev) => {
      const updated = prev.filter((p) => p.id !== task.id);
      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <button className="task-item__btns-delete" type="button" onClick={handleDelete}>
      <DeleteOutlined className="task-item__icon task-item__icon--delete"/>
    </button>
  );
};

export default TaskDelete;
