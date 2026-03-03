import { useTasks } from "../../Context/ContextTask";
import TaskButton from "../TaskButton";

const TaskProgress = ({
  projectId,
  status,
}: {
  projectId: string;
  status: string;
}) => {
  const { tasks, setTasks } = useTasks();

  const handleDrop = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t)),
    );
  };

  return (
    <ul className={`task task-${status}`}>
      {tasks
        .filter(
          (task) => task.projectId === projectId && task.status === status,
        )
        .map((task) => (
          <li className="task-item" key={task.id}>
            <TaskButton
              id={task.id}
              title={task.title}
              status={task.status}
              onDrop={() => handleDrop(task.id)}
            />
          </li>
        ))}
    </ul>
  );
};

export default TaskProgress;
