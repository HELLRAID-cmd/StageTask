import "./Task.scss";
import ButtonCreate from "../Projects/ButtonCreate";

const Task = () => {

  return (
    <div className="task d-flex justify-content-center flex-column align-items-center">
      <h1 className="task-title fw-medium text-light">У вас нет проекта</h1>
      <h2 className="task-subtitle fw-medium text-light">Создайте его</h2>
      <ButtonCreate/>
    </div>
  );
};

export default Task;
