import { useTasks } from "../../Context/ContextTask";
import TaskButton from "../TaskButton";

const TaskPlanned = ({
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

  const t = tasks.map((ts) => ts.status);

  if (t) {
    console.log(t);
  }

  return (
    <ul className="task task-planned">
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

export default TaskPlanned;
