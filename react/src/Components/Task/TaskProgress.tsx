import { useTasks } from "../Context/ContextTask";
import TaskButton from "./TaskButton";

const TaskProgress = () => {
  const { tasks } = useTasks();

  return (
    <ul className="task task-execute">
      {tasks.map((task) => (
        <li className="task-item" key={task.id}>
          <TaskButton id={task.id} title={task.title} />
        </li>
      ))}
    </ul>
  );
};

export default TaskProgress;
