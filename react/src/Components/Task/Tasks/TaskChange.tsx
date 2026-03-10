import { Input } from "antd";
import { useState } from "react";

const TaskChange = ({ input }: { input: string }) => {
  const [inputTask, setInputTask] = useState(input);

  return (
    <Input
      id="name"
      placeholder="Введите название"
      value={inputTask}
      onChange={(e) => setInputTask(e.target.value)}
    />
  );
};

export default TaskChange;
