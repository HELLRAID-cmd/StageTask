import { useTask } from "../../Context/Task/TaskContext";
import type { Task } from "../../../shared/props/type";
import { DeleteOutlined } from "@ant-design/icons";

const TaskDelete: React.FC<{ task: Task }> = ({ task }) => {
  const { deleteTask } = useTask();

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <button
      className="task-item__btns-delete"
      type="button"
      onClick={handleDelete}
    >
      <DeleteOutlined className="task-item__icon task-item__icon--delete" />
    </button>
  );
};

export default TaskDelete;
