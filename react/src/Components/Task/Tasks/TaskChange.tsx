import { Input } from "antd";
import { useState } from "react";
import { useTasks } from "../../Context/ContextTask";

const TaskChange = ({ input, taskId }: { input: string; taskId: string }) => {
  const [inputTask, setInputTask] = useState(input);
  const { updateTaskTitle, setEditTaskId } = useTasks();

  const handleSave = () => {
    updateTaskTitle(taskId, inputTask);
    setEditTaskId(null);
  };

  return (
    <Input
      id="name"
      placeholder="Введите название"
      value={inputTask}
      onChange={(e) => setInputTask(e.target.value)}
      onPressEnter={handleSave}
      onBlur={handleSave}
    />
  );
};

export default TaskChange;
