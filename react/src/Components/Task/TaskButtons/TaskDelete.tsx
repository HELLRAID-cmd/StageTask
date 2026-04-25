import { useTask } from "../../Context/Task/TaskContext";
import type { Task } from "../../../shared/props/type";
import { DeleteOutlined } from "@ant-design/icons";
import Button from "../../../shared/ui/button";

const TaskDelete: React.FC<{ task: Task }> = ({ task }) => {
  const { deleteTask } = useTask();

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <Button
      variant="button"
      className="task-item__btns-delete p-0"
      onClick={handleDelete}
    >
      <DeleteOutlined className="task-item__icon task-item__icon--delete" />
    </Button>
  );
};

export default TaskDelete;
